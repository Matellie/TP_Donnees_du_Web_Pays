<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 16:06:46 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
    <xsl:param name="param_ref_type"/>

    <xsl:template match="/"> 
	<html>
        <body>
            <element_a_recuperer>
                <xsl:for-each select="//country[./country_codes/cca3 = $param_ref_type]/languages/*">
                    <xsl:variable name="current_languages" select="."></xsl:variable>

                    <xsl:for-each select="//country[$current_languages = languages/*]/country_codes/cca2">
                    
                        <span name="question11Codes"><xsl:value-of select="."/></span>

                    </xsl:for-each>
                </xsl:for-each>
            </element_a_recuperer>
        </body>
    </html>
    </xsl:template>

</xsl:stylesheet>
