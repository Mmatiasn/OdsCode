using System.Threading.Tasks;

namespace YouTubeDll
{
    public class Service
    {
        private YouTubeVideoSearchResult _youTubeVideoSearchResult;
        private YouTubeVideoSearchService _youTubeVideoSearchService;

        public Service(string apikey)
        {
            _youTubeVideoSearchResult = new YouTubeVideoSearchResult();
            _youTubeVideoSearchService = new YouTubeVideoSearchService(apikey);
        }

        public async Task<YouTubeVideoSearchResult> SearchYouTubeAsync(string query)
        {
            _youTubeVideoSearchResult = await _youTubeVideoSearchService.SearchYouTubeAsync(query);
            return _youTubeVideoSearchResult;
        }

        public async Task<YouTubeVideoSearchResult> SearchYouTubeAsync(string query, string pageToken)
        {
            _youTubeVideoSearchResult = await _youTubeVideoSearchService.SearchYouTubeAsync(query, pageToken);
            return _youTubeVideoSearchResult;
        }

        public async Task<YouTubeVideoSearchResult> GetYouTubeByIdsAsync(string query)
        {
            _youTubeVideoSearchResult = await _youTubeVideoSearchService.GetYouTubeByIdsAsync(query);
            return _youTubeVideoSearchResult;
        }
    }
}
