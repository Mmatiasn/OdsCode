using System.Collections.Generic;
using OdsCode.Models;
using System.Threading.Tasks;

namespace OdsCode.Repository
{
    public interface IWorldRepository
    {

        void AddTrip(Trip trip);
        void AddStop(int tripId, string userName, Stop newStop);
        IEnumerable<Trip> GetAllTrips(string userName);
        IEnumerable<Trip> GetUserTripsWithStops(string userName);
        Trip GetTripById(int tripId, string userName);
        Trip DeleteUserTripWithStops(int tripId, string userName);
        Trip GetUserTripWithStops(int tripId, string userName);
        Stop DeleteUserTripStop(int tripId, int stopId, string userName);
        
        Task<bool> SaveChangesAsync();
        Task<bool> SaveAll();
        IEnumerable<PlayList> GetAllPlayLists(string userName);
        PlayList GetAPlayList(string userName, int playListId);
        PlayList DeleteAPlayList(string userName, int playListId);
        Video SaveVideoChanges(string userName, int playListId, Video videoChanges);
        void AddAPlayList(string userName, PlayList newPlayList);

    }
}