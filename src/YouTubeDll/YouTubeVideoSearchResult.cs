using System;
using Newtonsoft.Json.Linq;

namespace YouTubeDll
{
	public class YouTubeVideoSearchResult
	{
        public bool Success { get; set; }
        public string Message { get; set; }
        public string PageToken { get; set; }
        public JArray SearchResults { get; set; }
    }
}


