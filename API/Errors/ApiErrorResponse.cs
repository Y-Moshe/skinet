namespace API.Errors
{
  public class ApiErrorResponse
  {
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public int AttemptsCount { get; }

    public ApiErrorResponse(int statusCode, string message = null, int attemptsCount = 0)
    {
      AttemptsCount = attemptsCount;
      StatusCode = statusCode;
      Message = message ?? GetDefaultMessage(statusCode);
    }

    private string GetDefaultMessage(int statusCode)
    {
      return statusCode switch
      {
        400 => "A bad request, you have made",
        401 => "Authorized, you are not",
        404 => "Resource found, it was not",
        500 => "The Errors are the path to the dark side, erros leads to anger, anger leads to hate, hate leads to career change",
        _ => null
      };
    }
  }
}