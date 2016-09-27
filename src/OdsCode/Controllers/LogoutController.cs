using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using OdsCode.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OdsCode.Controllers
{
    public class LogoutController : Controller
    {
        private SignInManager<WorldUser> _signInManager;

        public LogoutController(SignInManager<WorldUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await _signInManager.SignOutAsync();
                //Need something to logout right away...
                return View();
            }
            return RedirectToAction("Home", "Home");
        }
    }
}
