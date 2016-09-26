using System;
using System.Diagnostics;

namespace OdsCode.Services
{
    public class DebugMailService : IMailService
    {
        public void SendMail(string to, string from, string subject, string body)
        {
            Debug.WriteLine($"Sending Mail: To: {to} From: {from} Subject: {subject} Body: {body}");
        }

        public void SendMail(string to, string from, string subject, string body, DateTime enteredOn)
        {
            Debug.WriteLine($"Sending Mail: To: {to} From: {from} Subject: {subject} Body: {body} Entered: {enteredOn}");
        }
    }
}
