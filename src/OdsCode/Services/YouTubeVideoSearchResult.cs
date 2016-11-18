using Newtonsoft.Json.Linq;

namespace OdsCode.Services
{
    public class YouTubeVideoSearchResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string PageToken { get; set; }
        public JArray SearchResults { get; set; }
    }
}