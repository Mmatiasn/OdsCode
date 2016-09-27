using System.Collections.Generic;
using OdsCode.Models;
using System.Threading.Tasks;

namespace OdsCode.Repository
{
    public interface IWorldRepository
    {
        IEnumerable<Trip> GetAllTrips();
        Trip GetTripByName(string tripName);
        void AddTrip(Trip trip);
        void AddStop(string tripName, Stop newStop);
        Task<bool> SaveChangesAsync();
        IEnumerable<Trip> GetUserTripsWithStops();
        IEnumerable<Trip> GetUserTripsWithStops(string name);
        Task<bool> SaveAll();
    }
}