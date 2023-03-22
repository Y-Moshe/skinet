using System.Security.Claims;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;

    public AccountController(
      UserManager<AppUser> userManager,
      SignInManager<AppUser> signInManager,
      IMapper mapper,
      ITokenService tokenService
    )
    {
      _tokenService = tokenService;
      _mapper = mapper;
      _signInManager = signInManager;
      _userManager = userManager;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentLoggedInUser()
    {
      var user = await _userManager.FindUserByClaims(User);
      return _mapper.Map<AppUser, UserDto>(user);
    }

    [HttpGet("exists")]
    public async Task<ActionResult<bool>> CheckEmailExistence([FromQuery] string email)
    {
      return await _userManager.FindByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
      var user = await _userManager.FindUserByClaims(User);
      return _mapper.Map<Address, AddressDto>(user.Address);
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
    {
      var user = await _userManager.FindUserByClaims(User);
      user.Address = _mapper.Map<AddressDto, Address>(address);

      var result = await _userManager.UpdateAsync(user);
      if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

      return BadRequest(new ApiErrorResponse(400));
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginCredentialsDto credentials)
    {
      var user = await _userManager.FindByEmailAsync(credentials.Email);
      if (user == null) return Unauthorized(new ApiErrorResponse(401));

      var matchResult = await _signInManager.CheckPasswordSignInAsync(user, credentials.Password, true);

      if (matchResult.IsLockedOut) return Unauthorized(new ApiErrorResponse(401, "Your account is locked out!"));
      if (!matchResult.Succeeded) return Unauthorized(new ApiErrorResponse(401, null, user.AccessFailedCount));

      return new LoginResponseDto
      {
        User = _mapper.Map<AppUser, UserDto>(user),
        Token = _tokenService.CreateUserToken(user)
      };
    }

    [HttpPost("register")]
    public async Task<ActionResult<LoginResponseDto>> Register(RegisterFieldsDto fields)
    {
      var user = new AppUser
      {
        DisplayName = fields.DisplayName,
        Email = fields.Email,
        UserName = fields.Email
      };

      var result = await _userManager.CreateAsync(user, fields.Password);
      if (!result.Succeeded) return BadRequest(new ApiErrorResponse(400));

      return new LoginResponseDto
      {
        User = _mapper.Map<AppUser, UserDto>(user),
        Token = _tokenService.CreateUserToken(user)
      };
    }
  }
}