using System;

namespace OdsCode.Services
{
    public interface IMailService
    {
        void SendMail(string to, string from, string subject, string body);
        void SendMail(string v, string email, string subject, string message, DateTime enteredOn);
    }
}
