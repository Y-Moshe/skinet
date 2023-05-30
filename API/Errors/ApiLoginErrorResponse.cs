namespace API.Errors;

public class ApiLoginErrorResponse : ApiErrorResponse
{
    public int AttemptsCount { get; set; }
    public bool IsLockedOut { get; set; }

    public ApiLoginErrorResponse(
        string message,
        int attemptsCount,
        bool isLockedOut) : base(401, message)
    {
        AttemptsCount = attemptsCount;
        IsLockedOut = isLockedOut;
    }
}
