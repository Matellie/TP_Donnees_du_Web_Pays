<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 16:06:46 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
    <xsl:param name="param_ref_type"/>

    <xsl:template match="/"> 
	<html>
        <body>
            <element_a_recuperer>

                <datalist id="mylist">
                    <xsl:for-each select="//country">
                        <option><xsl:value-of select="./country_codes/cca3"/></option>
                    </xsl:for-each>
                </datalist>

                <input type="text" list="mylist" id="countryCodeInput" name="country" size="50" autocomplete="off" />

            </element_a_recuperer>
        </body>
    </html>
    </xsl:template>



</xsl:stylesheet>
