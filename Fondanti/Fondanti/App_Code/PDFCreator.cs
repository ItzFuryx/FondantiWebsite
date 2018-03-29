using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;


/// <summary>
/// Summary description for PDFCreator
/// </summary>
public class PDFCreator
{
    public PDFCreator(List<System.Web.UI.WebControls.ListItem> items, string totaalPrijs, HttpResponseBase response, HttpServerUtilityBase server)
    {    // Create a Document object
        var document = new Document(PageSize.A4, 50, 50, 25, 25);


        // Create a new PdfWrite object, writing the output to a MemoryStream
        var output = new MemoryStream();
        var writer = PdfWriter.GetInstance(document, output);

        // Open the Document for writing
        document.Open();

        // Read in the contents of the Receipt.htm HTML template file
        string contents = File.ReadAllText(server.MapPath("~/HTMLTemplate/Receipt.htm"));

        // Replace the placeholders with the user-specified text
        contents = contents.Replace("[TOTALPRICE]", Convert.ToDecimal(totaalPrijs).ToString("c"));
        contents = contents.Replace("[ORDERDATE]", DateTime.Now.ToShortDateString());

        var itemsTable = @"<table><tr><th style=""font-weight: bold"">Naam</th><th style=""font-weight: bold"">Prijs</th></tr>";
        foreach (System.Web.UI.WebControls.ListItem item in items)
        {
                // Each CheckBoxList item has a value of ITEMNAME|ITEM#|QTY, so we split on | and pull these values out...
                var pieces = item.Value.Split("|".ToCharArray());
                itemsTable += string.Format("<tr><td>{0}</td><td>{1}</td></tr>",
                                            pieces[0], pieces[1]);
            
        }

        itemsTable += "</table>";

        contents = contents.Replace("[ITEMS]", itemsTable);


        var parsedHtmlElements = HTMLWorker.ParseToList(new StringReader(contents), null);
        foreach (var htmlElement in parsedHtmlElements)
        {
            document.Add(htmlElement as IElement);
        }

        // You can add additional elements to the document. Let's add an image in the upper right corner
        //var logo = iTextSharp.text.Image.GetInstance(Server.MapPath("~/Images/4guysfromrolla.gif"));
        //logo.SetAbsolutePosition(440, 800);
        //document.Add(logo);

        document.Close();

        response.ContentType = "application/pdf";
        response.AddHeader("Content-Disposition", string.Format("attachment;filename=Receipt-{0}.pdf", "5"));
        response.BinaryWrite(output.ToArray());
    }
}