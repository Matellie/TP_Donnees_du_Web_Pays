<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 16:06:46 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
    <xsl:param name="param_ref_type"/>

    <xsl:template match="/"> 
	<html>
        <body>
            <element_a_recuperer>
                Nom officiel du pays : <xsl:apply-templates select="//country[country_codes/cca3 = $param_ref_type]/country_name/offic_name"/><br/>
                Capitale du pays : <xsl:apply-templates select="//country[country_codes/cca3 = $param_ref_type]/capital"/><br/>
            </element_a_recuperer>
        </body>
    </html>
    </xsl:template>



</xsl:stylesheet>
