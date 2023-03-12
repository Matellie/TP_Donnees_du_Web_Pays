<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 16:06:46 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
		
	<xsl:template match="/"> 
	<html> 
	<head> 
		<title> 
			Countries of the world 
		</title> 
	</head> 
	<body style="background-color:white;"> 
		<h1>Information about the countries</h1>
		<xsl:apply-templates select="//metadonnees"/>
		Mise en forme par Tarassov Elie, Habran Mathieu (B3221)
		<hr/><hr/>
		Countries where more than two languages are spoken:
		<br/>
		<xsl:for-each select="//country">
			<xsl:if test="count(languages/*)>2">
			•<xsl:value-of select="country_name/common_name"/>:

				<xsl:for-each select="languages/*">
					
					<xsl:value-of select="."/>  (<xsl:value-of select="name(.)"/>)
					<xsl:choose>
						<xsl:when test="position() = last()"><br/>
						</xsl:when>
						<xsl:otherwise>,
						</xsl:otherwise>
					</xsl:choose>
					
				</xsl:for-each>
			</xsl:if>
		</xsl:for-each>
		
		Countries with the most neighbors:
		<xsl:for-each select="//country">
			<xsl:sort select="count(borders/neighbour)" data-type = "number" order="descending"/>
			<xsl:if test="position()=1">
				<xsl:value-of select="country_name/common_name"/>
				<xsl:variable name="max_neighbors" select="count(borders/neighbour)">assigned</xsl:variable>	
			</xsl:if>

			C'est cette partie qui crash ie quand je veux utilise max_neighbors hors du if d'avant
			<xsl:if test="count(borders/neighbour) = count(position(1)/borders/neighbour)">
				, <xsl:value-of select="country_name/common_name"/>
			</xsl:if>
			
		</xsl:for-each>
		
		
		
		<hr/><hr/>
		<xsl:for-each select="//continent[not(.=preceding::continent)]">
			<xsl:variable name="current_continent" select="."></xsl:variable>

			<h3>Pays du continent : <xsl:value-of select="$current_continent"/> par sous-régions :</h3>
			
			<xsl:for-each select="//subregion[not(.=preceding::subregion)]">
				<xsl:if test="../continent=$current_continent">
					
					<h4><xsl:value-of select="."/> (<xsl:value-of select="count(//country[./infosContinent/subregion=current()])"/> pays)</h4>
					
					<table border="3" align="center">
						<tr>
							<th>N°</th>
							<th>Name</th>
							<th>Capital</th>
							<th>Coordinates</th>
							<th>Neigbors</th>
							<th>Flag</th>
							<th>Spoken languages</th>
						</tr>
						<xsl:apply-templates select="//country[./infosContinent/subregion=current()]"/>
					</table>
				
				</xsl:if>
			</xsl:for-each>
		</xsl:for-each>

	</body> 
	</html> 
	</xsl:template> 


	<xsl:template match="metadonnees">
	<p style="text-align:center; color:green;">
		Objectif : <xsl:value-of select="objectif"/>
	</p>
	</xsl:template>


	<xsl:template match="country"> 
	<tr>
		<td>
			<xsl:value-of select="position()"/>
		</td>
		<td>
			<span style="color:green;">
				<xsl:value-of select="country_name/offic_name"/>
			</span>
			(<xsl:value-of select="country_name/common_name"/>)
			<br/>
			<span style="color:blue;">
				<xsl:if test="count(country_name/native_name[@lang = 'fra']/offic_name) != 0">
					Nom français : 
				</xsl:if>
				<xsl:value-of select="country_name/native_name[@lang = 'fra']/offic_name"/>
			</span>
		</td>
		<td>
			<xsl:value-of select="capital"/>
		</td>
		<td>
			Latitude : <xsl:value-of select="coordinates/@lat"/><br/>
			Longitude : <xsl:value-of select="coordinates/@long"/>
		</td>
		<td>
			<xsl:for-each select="borders/neighbour">
				<xsl:value-of select="//country[country_codes/cca3 = current()]/country_name/common_name"/>
				<xsl:if test="position() != last()">, 
				</xsl:if>
			</xsl:for-each>
			<xsl:if test="count(borders/neighbour) = 0">
				Island
			</xsl:if>
		</td>
		<td>
			<img src="http://www.geonames.org/flags/x/{translate(country_codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/>
		</td>
		<td>
			<xsl:for-each select="languages/*">
				<xsl:value-of select="."/>
				<xsl:if test="position() != last()">, 
				</xsl:if>
			</xsl:for-each>
		</td>
	</tr>
	</xsl:template>

</xsl:stylesheet>