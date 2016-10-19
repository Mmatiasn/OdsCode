using Newtonsoft.Json.Linq;

namespace OdsCode.Services
{
    public class YouTubeSearchResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public JObject SearchResults { get; set; }
    }
}