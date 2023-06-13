DECLARE
   -- Variable declarations
   -- ...

   xml_data CLOB := EMPTY_CLOB();

BEGIN
   SELECT XMLELEMENT("OrderTransactions",
                  XMLELEMENT("Order",
                     XMLELEMENT("TransactionDateTime", b.TransactionDateTime),
                     -- Other elements
                     -- ...

                     -- AddressContact elements
                     XMLAGG(
                        XMLELEMENT("AddressContact",
                           XMLELEMENT("AddressUse", ac.AddressUse),
                           XMLELEMENT("AddressLine1", ac.AddressLine1),
                           XMLELEMENT("AddressLine2", ac.AddressLine2),
                           -- Other AddressContact elements
                           -- ...
                        )
                     ) AS "AddressContact",
                     
                     -- OrderComment element
                     XMLELEMENT("OrderComment", b.OrderComment),

                     -- Entity elements
                     XMLAGG(
                        XMLELEMENT("Entity",
                           XMLELEMENT("RevenueRegion", en.RevenueRegion),
                           XMLELEMENT("ProductCode", en.ProductCode),
                           -- Other Entity elements
                           -- ...

                           -- Feature elements
                           XMLAGG(
                              XMLELEMENT("Feature",
                                 XMLELEMENT("ItemNumber", ft.ItemNumber),
                                 -- Other Feature elements
                                 -- ...
                              )
                           ) AS "Feature"
                        )
                     ) AS "Entity"
                  )
               ).getClobVal()
   INTO xml_data
   FROM (
      -- Your JSON_TABLE queries here
   ) b
   LEFT JOIN (
      -- JSON_TABLE query for AddressContact
   ) ac ON 1=1
   LEFT JOIN (
      -- JSON_TABLE query for Entity
   ) en ON 1=1
   LEFT JOIN (
      -- JSON_TABLE query for Feature
   ) ft ON 1=1;

   -- Print the XML data
   DBMS_OUTPUT.PUT_LINE(xml_data);
END;
/
