using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace restapi.Models
{
    /// <summary>
    /// Metric class represent the data model that needs to match with fields in database
    /// in this case, it matches with the template fields in the database
    /// </summary>
    public class Metric
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] // allow passing the parameter as type string instead of an ObjectId
        // ID is the unique ID to identify the document in the collection, matches the _id in database
        public string? ID { get; set; }
     

        [BsonDateTimeOptions(Representation = BsonType.Document)]
        //a timestamp of one specific document
        public DateTime Timestamp { get; set; }

        //the CPU utilization which is stored as object in database
        public CPUUtilization CPUUtilization { get; set; }

    }

    /// <summary>
    /// Object is handle with class
    /// In this case,the cpu utilization object is handled, 
    /// along with three fields that is held inside of the object
    /// </summary>
    public class CPUUtilization
    {
        
        public double user { get; set; } //cpu used by user
        public double System { get; set; }//cpu used by system
        public double Idle { get; set; }//cpu used by Idle
    }

}
