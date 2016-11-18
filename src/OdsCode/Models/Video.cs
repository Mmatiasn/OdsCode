using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace OdsCode.Models
{
    public class Video
    {
        public int Id { get; set; }
        public int PlayListId { get; set; }
        public string YtId { get; set; }
    }
}
