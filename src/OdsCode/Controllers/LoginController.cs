using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using OdsCode.Models;
using OdsCode.ViewModels;
using System.Net;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OdsCode.Controllers
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class LoginController : Controller
    {
        private SignInManager<WorldUser> _signInManager;

        public LoginController(SignInManager<WorldUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Home", "Home");
            }
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel vm, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(
                    vm.Username,
                    vm.Password,
                    true,
                    false);

                if (signInResult.Succeeded)
                {
                    if (string.IsNullOrWhiteSpace(returnUrl))
                    {
                        return RedirectToAction("Home", "Home");
                    }
                    else
                    {
                        try
                        {
                            string[] returnUrlDecoded = WebUtility.UrlDecode(returnUrl).Split(new char[0]);
                            return RedirectToAction(returnUrlDecoded[0], returnUrlDecoded[2]);
                        }
                        catch
                        {
                            return RedirectToAction("Home", "Home");
                        }

                    }
                }
                else
                {
                    ModelState.AddModelError("", "Username or password incorrect");
                }
            }
            return View();
        }
    }
}
