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
        Trip DeleteUserTripWithStops(int tripId, string userName);
        Trip GetUserTripWithStops(int tripId, string userName);
        PlayList GetUserPlayListWithVideos(int playListsId, string userName);
        IEnumerable<Trip> GetUserTripsWithStops(string userName);
        Task<bool> SaveChangesAsync();
        Task<bool> SaveAll();
    }
}