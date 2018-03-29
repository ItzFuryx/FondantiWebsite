using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebMatrix.Data;

/// <summary>
/// Summary description for Toevoegen
/// </summary>
public class Toevoegen
{
    Database db;

    public Toevoegen()
    {
        string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\Fondanti.mdf;Integrated Security=True";
        string provider = "System.Data.SqlClient";
        this.db = Database.OpenConnectionString(connectionString, provider);
    }

    public bool VoegSmaakToe (string nieuwesmaak, string nieuwevullingprijs)
    {
        
        if (String.IsNullOrEmpty(nieuwesmaak) || String.IsNullOrEmpty(nieuwevullingprijs))
        {

        }
        else
        {
            var succes = this.db.Execute(@"INSERT INTO Vulling (smaak, vulling_prijs) VALUES (@0, @1)", nieuwesmaak, nieuwevullingprijs);
            if (succes == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

  
}