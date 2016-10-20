using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OdsCode.Models
{
    public class PlayList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserName { get; set; }
        public ICollection<Video> Videos { get; set; }
    }
}
