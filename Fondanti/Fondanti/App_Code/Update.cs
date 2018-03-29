using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebMatrix.Data;

/// <summary>
/// dit is de samenvatting
/// </summary>
public class Update
{
    Database db;

    public Update()
    {
        string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\Fondanti.mdf;Integrated Security=True";
        string provider = "System.Data.SqlClient";
        this.db = Database.OpenConnectionString(connectionString, provider);
    }


    public bool Toevoegen(string nieuwitem, string nieuwprijs, string nieuwallergie, string table, string a, string b, string c, string d)
    {
        if(String.IsNullOrEmpty(nieuwprijs) && table == "Allergieën" || String.IsNullOrEmpty(nieuwprijs) && table == "Thema")
        {
            var succes = this.db.Execute(@"INSERT INTO " + table + " (" + b + ") VALUES (@0)", nieuwitem);
            if (succes == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else if (String.IsNullOrEmpty(nieuwitem) || String.IsNullOrEmpty(nieuwprijs))
        {
            return false;
        }
        else if(d == null)
        {
            var succes = this.db.Execute(@"INSERT INTO " + table + " (" + b + ", " + c + ") VALUES (@0, @1)", nieuwitem, nieuwprijs);
            if (succes == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            if(nieuwallergie == "Geen Allergie")
            {
                nieuwallergie = "2";
                var succes = this.db.Execute(@"INSERT INTO " + table + " (" + b + ", " + c + ", " + d + ") VALUES (@0, @1, @2)", nieuwitem, nieuwprijs, nieuwallergie);
                return true;
            }
            else
            {
                var lol = this.db.Query(@"SELECT allergieën_id FROM Allergieën WHERE allergieën = @0", nieuwallergie);
                foreach (var row in lol)
                {
                    var succes = this.db.Execute(@"INSERT INTO " + table + " (" + b + ", " + c + ", " + d + ") VALUES (@0, @1, @2)", nieuwitem, nieuwprijs, row.allergieën_id);
                    if (succes == 1)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return false;
        }
    }

    public bool Verwijderen(string id, string table, string a, string b, string c, string d)
    {

        var succes = this.db.Execute(@"DELETE FROM " + table + " WHERE " + a + " = @0", id);
        if(succes == 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool WijzigItem(string  wijzigid, string wijzigprijs, string wijzigallergie, string wijzigitem, string table, string a, string b, string c, string d)
    {
        if(String.IsNullOrEmpty(wijzigprijs) && table == "Allergieën" || String.IsNullOrEmpty(wijzigprijs) && table == "Thema")
        {
            var succesa = db.Execute(@"UPDATE " + table + " SET " + b + " = @0 WHERE " + a + " = @1", wijzigitem, wijzigid);
            if (succesa == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else if (String.IsNullOrEmpty(wijzigprijs) || String.IsNullOrEmpty(wijzigitem))
        {
            return false;                    
        }
        else if(d == null)
        {
            var succesa = db.Execute(@"UPDATE " + table + " SET " + c + " = @0, " + b + " = @1 WHERE " + a + " = @2", wijzigprijs, wijzigitem, wijzigid);
            if (succesa == 1)
            {
                return true;
            }
            else
            {
                return false;                             
            }
        }
        else
        {
            var succes = db.Query(@"SELECT allergieën_id FROM " + table + " WHERE Allergieën.allergieën = @0", wijzigallergie);
            //foreach (var rows in succes)
            //{
            //    wijzigallergie = rows.allergieën_id;
            //}
            var succesa = db.Execute(@"UPDATE " + table + " SET " + c + " = @0, " + b + " = @1, " + d + " = @2 WHERE " + a + " = @3", wijzigprijs, wijzigitem, wijzigallergie, wijzigid);
            if (succesa == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }



}