using System.Security.Claims;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
  public class AccountRepository : IAccountRepository
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;

    public AccountRepository(
      UserManager<AppUser> userManager,
      SignInManager<AppUser> signInManager,
      ITokenService tokenService
    )
    {
      _tokenService = tokenService;
      _signInManager = signInManager;
      _userManager = userManager;
    }

    public string GenerateToken(AppUser user)
    {
      return _tokenService.CreateUserToken(user);
    }

    public async Task<AppUser> GetUserByClaims(ClaimsPrincipal userClaims)
    {
      var email = userClaims.FindFirstValue(ClaimTypes.Email);
      return await _userManager.Users
        .Include(u => u.Address)
        .SingleOrDefaultAsync(u => u.Email == email);
    }

    public async Task<AppUser> GetUserByEmailAsync(string email)
    {
      return await _userManager.FindByEmailAsync(email);
    }

    public async Task<AppUser> LoginAsync(string email, string password)
    {
      var user = await _userManager.FindByEmailAsync(email);
      if (user == null) throw new LoginException("Invalid email or password!");

      var passwordMatchResult = await _signInManager.CheckPasswordSignInAsync(user, password, true);

      if (passwordMatchResult.IsLockedOut)
        throw new LoginException("Your account is locked out!", user.AccessFailedCount, passwordMatchResult.IsLockedOut);
      if (!passwordMatchResult.Succeeded)
        throw new LoginException("Invalid email or password!", user.AccessFailedCount);

      return user;
    }

    public async Task<AppUser> RegisterAsync(dynamic userFields)
    {
      var isEmailExists = (await _userManager.FindByEmailAsync(userFields.Email)) != null;
      if (isEmailExists) throw new Exception("Account already exists with email " + userFields.Email);

      var user = new AppUser
      {
        FullName = userFields.FullName,
        Email = userFields.Email,
        UserName = userFields.Email
      };

      var result = await _userManager.CreateAsync(user, userFields.Password);
      if (!result.Succeeded) throw new Exception("Something went wrong");

      return user;
    }

    public async Task<IdentityResult> UpdateUserAsync(dynamic user)
    {
      return await _userManager.UpdateAsync(user);
    }
  }

  public class LoginException : Exception
  {
    public int AttemptsCount { get; set; }
    public bool IsLockedOut { get; set; }

    public LoginException(string message, int attemptsCount = 0, bool isLockedOut = false) : base(message)
    {
      AttemptsCount = attemptsCount;
      IsLockedOut = isLockedOut;
    }
  }
}