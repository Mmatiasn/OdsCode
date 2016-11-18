using System.Collections.Generic;
using OdsCode.Models;
using System.Threading.Tasks;

namespace OdsCode.Repository
{
    public interface IWorldRepository
    {
        Trip GetTripById(int tripId, string userName);
        void AddTrip(Trip trip);
        void AddPlayList(PlayList playList);
        void AddStop(int tripId, string userName, Stop newStop);
        Stop DeleteUserTripStop(int tripId, int stopId, string userName);
        IEnumerable<Trip> GetAllTrips(string userName);
        IEnumerable<PlayList> GetAllPlayLists(string userName);
        IEnumerable<Trip> GetUserTripsWithStops(string userName);
        Trip DeleteUserTripWithStops(int tripId, string userName);
        Trip GetUserTripWithStops(int tripId, string userName);
        void AddVideo(int playListsId, string userName, Video newVideo);
        PlayList GetPlayListById(int playListId, string userName);
        IEnumerable<PlayList> GetUserPlayListWithVideos(string userName);
        PlayList DeleteUserPlayListWithVideos(int playListId, string userName);
        Video DeleteUserPlayListVideo(int playListId, int videId, string userName);
        Task<bool> SaveChangesAsync();
        Task<bool> SaveAll();
    }
}