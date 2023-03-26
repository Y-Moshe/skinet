using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly IMapper _mapper;
    private readonly IAccountRepository _accountRepository;

    public AccountController(IAccountRepository accountRepository, IMapper mapper)
    {
      _accountRepository = accountRepository;
      _mapper = mapper;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentLoggedInUser()
    {
      var user = await _accountRepository.GetUserByClaims(User);
      return _mapper.Map<AppUser, UserDto>(user);
    }

    [HttpGet("exists")]
    public async Task<ActionResult<bool>> CheckEmailExistence([FromQuery] string email)
    {
      return await _accountRepository.GetUserByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
      var user = await _accountRepository.GetUserByClaims(User);
      return _mapper.Map<Address, AddressDto>(user.Address);
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
    {
      var user = await _accountRepository.GetUserByClaims(User);
      user.Address = _mapper.Map<AddressDto, Address>(address);

      var result = await _accountRepository.UpdateUserAsync(user);
      if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

      return BadRequest(new ApiErrorResponse(400));
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginCredentialsDto credentials)
    {
      try
      {
        var user = await _accountRepository.LoginAsync(credentials.Email, credentials.Password);
        var token = _accountRepository.GenerateToken(user);
        return new LoginResponseDto
        {
          User = _mapper.Map<AppUser, UserDto>(user),
          Token = token
        };
      }
      catch (LoginException ex)
      {
        return Unauthorized(new ApiLoginErrorResponse(ex.Message, ex.AttemptsCount, ex.IsLockedOut));
      }
    }

    [HttpPost("register")]
    public async Task<ActionResult<LoginResponseDto>> Register(RegisterFieldsDto fields)
    {
      try
      {
        var user = await _accountRepository.RegisterAsync(fields);
        var token = _accountRepository.GenerateToken(user);
        return new LoginResponseDto
        {
          User = _mapper.Map<AppUser, UserDto>(user),
          Token = token
        };
      }
      catch (Exception ex)
      {
        return Unauthorized(new ApiErrorResponse(401, ex.Message));
      }
    }
  }
}