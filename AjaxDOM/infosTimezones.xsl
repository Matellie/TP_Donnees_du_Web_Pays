<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 16:06:46 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
    <xsl:param name="code"/>
    <xsl:param name="nbTime"/>

    <xsl:template match="/"> 
	<html>
        <body>
            <element_a_recuperer>
                    <tr>
                        <td><xsl:value-of select="//country[country_codes/cca2 = $code]/country_name/offic_name"/></td>
                        <td><xsl:value-of select="$nbTime"/></td>
                        <td><img src="http://www.geonames.org/flags/x/{translate($code, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/></td>
                    </tr>
            </element_a_recuperer>
        </body>
    </html>
    </xsl:template>

</xsl:stylesheet>
