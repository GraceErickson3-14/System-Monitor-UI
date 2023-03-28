using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class Metric
{
    private string Name;
    private string Value;
    private string Mode;
    private string Core;

    public string Names
    {
        get { return Name; }
        set { Name = value; }
    }

    public string Values
    {
        get { return Value; }
        set { Value = value; }
    }

    public string Modes
    {
        get { return Mode; }
        set { Mode = value; }
    }
}
public class windowsCpuCstate
{
    public string Name { get; set; }
    public string state { get; set; }
    public double value { get; set; }

}

public class windowsCsPhysicalMemorybyte
{
    public double Value { get; set; }
}

public class windowsOSVirtual
{
    public double value { get; set; }
}


public class windowsSizeBytes
{
    private string Name;
    private string Value;
    private string Volume;

    public string Names
    {
        get { return Name; }
        set { Name = value; }
    }
    public string Values
    {
        get { return Value; }
        set { Value = value; }
    }
    public string Volumes
    {
        get { return Volume; }
        set { Volume = value; }
    }
}

