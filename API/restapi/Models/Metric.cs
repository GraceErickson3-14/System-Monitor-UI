using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace restapi.Models
{
    /// <summary>
    /// Metric class represent the data model that needs to match with fields in database
    /// in this case, it matches with the template fields in the database
    /// </summary>
    public class Metric
    {
        [Required]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] // allow passing the parameter as type string instead of an ObjectId
        // ID is the unique ID to identify the document in the collection, matches the _id in database
        public string? ID { get; set; }

        [Required(ErrorMessage = "datime type Timestap is required")]
        //a timestamp of one specific document
        public DateTime Timestamp { get; set; }

        //the CPU utilization which is stored as object in database
        [Required]
        public CPUUtilization CPUUtilization { get; set; }
        [Required]
        public string IPAddress { get; set; }
        [Required]
        public string MACAddress { get; set; }
        [Required]
        public MemUsage MemUsage { get; set; }
        [Required]
        public DiskUtilization DiskUtilization { get; set; }

    }

    /// <summary>
    /// Object is handle with class
    /// In this case,the cpu utilization object is handled, 
    /// along with three fields that is held inside of the object
    /// </summary>
    public class CPUUtilization
    {
        [Required(ErrorMessage = "double type user is required")]
        public double user { get; set; } //cpu used by user
        [Required(ErrorMessage = "double type System is required")]
        public double System { get; set; }//cpu used by system
        [Required(ErrorMessage = "double type Idle is required")]
        public double Idle { get; set; }//cpu used by Idle
    }

    public class MemUsage
    {
        [Required(ErrorMessage = "double type GbUsed is required")]
        public double GbUsed { get; set; }
        [Required(ErrorMessage = "double type AvaMem is required")]
        public double AvaMem { get; set; }
    }

    public class DiskUtilization
    {
        [Required(ErrorMessage = "double type used is required")]
        public double used { get; set; }
        [Required(ErrorMessage = "double type Available is required")]
        public double Available { get; set; }
        [Required(ErrorMessage = "int type NumOperation is required")]
        public int NumOperation { get; set; }
        [Required(ErrorMessage = "double type DiskLatency is required")]
        public double DiskLatency { get; set; }
    }

}
