using Microsoft.AspNetCore.Mvc;

namespace OdsCode.Controllers.Web
{
    public class AboutController : Controller
    {
        public IActionResult About()
        {
            return View();
        }
    }
}
