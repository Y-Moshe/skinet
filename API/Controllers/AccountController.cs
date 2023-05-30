using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/account")]
public class AccountController : BaseApiController
{
    private readonly IMapper _mapper;
    private readonly IAccountService _accountRepository;

    public AccountController(IAccountService accountRepository, IMapper mapper)
    {
        _accountRepository = accountRepository;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentLoggedInUser()
    {
        var user = await _accountRepository.GetUserByClaimsAsync(User);
        return _mapper.Map<AppUser, UserDto>(user);
    }

    [HttpGet("exists")]
    public async Task<ActionResult<bool>>
        CheckEmailExistence([FromQuery] string email)
    {
        return await _accountRepository.GetUserByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
        var user = await _accountRepository.GetUserByClaimsAsync(User);
        return _mapper.Map<Address, AddressDto>(user.Address);
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>>
        UpdateUserAddress(AddressDto address)
    {
        var user = await _accountRepository.GetUserByClaimsAsync(User);
        user.Address = _mapper.Map<AddressDto, Address>(address);

        var result = await _accountRepository.UpdateUserAsync(user);
        if (result.Succeeded) return Ok(
          _mapper.Map<Address, AddressDto>(user.Address)
        );

        return BadRequest(new ApiErrorResponse(400));
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>>
        Login(LoginCredentialsDto credentials)
    {
        try
        {
            var user = await _accountRepository
              .LoginUserAsync(credentials.Email, credentials.Password);
            var token = _accountRepository.GenerateUserToken(user);
            return new LoginResponseDto
            {
                User = _mapper.Map<AppUser, UserDto>(user),
                Token = token
            };
        }
        catch (LoginException ex)
        {
            return Unauthorized(new ApiLoginErrorResponse
              (
                ex.Message,
                ex.AttemptsCount,
                ex.IsLockedOut
              )
            );
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<LoginResponseDto>>
        Register(RegisterFieldsDto fields)
    {
        try
        {
            var user = await _accountRepository.RegisterUserAsync(fields);
            var token = _accountRepository.GenerateUserToken(user);
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
