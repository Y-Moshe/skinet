namespace API.Errors
{
  public class ApiLoginErrorResponse : ApiErrorResponse
  {
    public int AttemptsCount { get; set; }
    public ApiLoginErrorResponse(int statusCode, string message, int attemptsCount) : base(statusCode, message)
    {
      AttemptsCount = attemptsCount;
    }
  }
}