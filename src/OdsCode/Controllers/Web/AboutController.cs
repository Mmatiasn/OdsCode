using Microsoft.AspNetCore.Mvc;

namespace OdsCode.Controllers.Web
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class AboutController : Controller
    {
        public IActionResult About()
        {
            return View();
        }
    }
}
