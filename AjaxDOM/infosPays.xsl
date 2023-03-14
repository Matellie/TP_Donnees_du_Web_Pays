<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 16:06:46 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
    <xsl:param name="param_ref_type"/>

    <xsl:template match="/"> 
	<html>
        <body>
            <element_a_recuperer>
                <table border="3" align="center" style="width: 100%">
                <tr>
                    <th style="width: 20%">Name</th>
                    <th style="width: 20%">Capital</th>
                    <th style="width: 20%">Spoken languages</th>
                    <th style="width: 20%">Flag</th>
                    <th class="monnaie hidden" style="width: 20%">Monnaie</th>
                    <tr>
                        <td><xsl:value-of select="//country[country_codes/cca2 = $param_ref_type]/country_name/offic_name"/></td>
                        <td><xsl:value-of select="//country[country_codes/cca2 = $param_ref_type]/capital"/></td>
                        <td><xsl:value-of select="//country[country_codes/cca2 = $param_ref_type]/languages"/></td>
                        <td><img src="http://www.geonames.org/flags/x/{translate($param_ref_type, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/></td>
                        <td id="question10" class="monnaie hidden"></td>
                    </tr>
                </tr>
                </table>
            </element_a_recuperer>
        </body>
    </html>
    </xsl:template>



</xsl:stylesheet>
