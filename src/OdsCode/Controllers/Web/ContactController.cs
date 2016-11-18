using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OdsCode.Services;
using OdsCode.ViewModels;
using System;

namespace OdsCode.Controllers.Web
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class ContactController : Controller
    {
        private IConfigurationRoot _config;
        private IMailService _mailService;

        public ContactController(IMailService mailService, IConfigurationRoot config)
        {
            _mailService = mailService;
            _config = config;
        }

        public IActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Contact(ContactViewModel model)
        {
            model.EnteredOn = DateTime.Now;
            if (ModelState.IsValid)
            {
                _mailService.SendMail(_config["MailSettings:Toaddress"], model.Email, model.Subject, model.Message, model.EnteredOn);
                ModelState.Clear();
                ViewBag.UserMessage = "Your message has been sent.";
            }

            return View();
        }
    }
}
