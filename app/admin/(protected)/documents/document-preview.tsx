"use client";

import { useRef, useState, useEffect } from "react";
import { Download, Eye } from "lucide-react";
import type { DocumentFormData, Totali } from "./page";

type DocumentPreviewProps = {
  formData: DocumentFormData;
  totali: Totali;
};

export function DocumentPreview({ formData, totali }: DocumentPreviewProps) {
  const preventivoPrintRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Formattazione italiana per numeri
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT");
  };

  // Esportazione PDF con logging completo
  const esportaPDF = async () => {
    console.group("🚀 PDF Export Process");
    console.time("Total Export Time");
    
    const elemento = preventivoPrintRef.current;
    if (!elemento) {
      console.error("❌ ERROR: Elemento DOM non trovato");
      console.groupEnd();
      alert("Elemento non trovato. Riprova.");
      return;
    }

    console.log("✅ Elemento DOM trovato:", elemento);
    setIsExporting(true);

    try {
      console.log("📦 Step 1: Importing libraries...");
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      console.log("✅ Libraries loaded successfully");

      console.log("📐 Step 2: Measuring element and preloading images...");
      const rect = elemento.getBoundingClientRect();
      console.log("Element dimensions:", {
        width: rect.width,
        height: rect.height,
        scrollWidth: elemento.scrollWidth,
        scrollHeight: elemento.scrollHeight,
      });

      // Preload delle immagini per assicurarsi che siano caricate
      const images = elemento.querySelectorAll('img');
      console.log(`🖼️ Preloading ${images.length} images...`);
      await Promise.allSettled(
        Array.from(images).map((img) => {
          return new Promise<void>((resolve) => {
            const imgElement = img as HTMLImageElement;
            if (imgElement.complete && imgElement.naturalWidth > 0) {
              console.log(`✅ Image already loaded: ${imgElement.src}`);
              resolve();
            } else {
              imgElement.onload = () => {
                console.log(`✅ Image loaded: ${imgElement.src}`);
                resolve();
              };
              imgElement.onerror = () => {
                console.warn(`⚠️ Image failed to load: ${imgElement.src}`);
                resolve();
              };
              // Force reload se non è caricata
              if (imgElement.src) {
                imgElement.src = imgElement.src;
              }
            }
          });
        })
      );

      // Attendi che tutto sia caricato
      console.log("⏳ Step 3: Waiting for complete load...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("🎨 Step 4: Rendering canvas with html2canvas...");
      console.time("html2canvas render");
      
      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false, // Disabilita logging in produzione
        windowWidth: elemento.scrollWidth,
        windowHeight: elemento.scrollHeight,
        imageTimeout: 10000, // Timeout più lungo per VPS
        removeContainer: true,
        foreignObjectRendering: false, // Disabilita per compatibilità
        ignoreElements: (element) => {
          // Ignora elementi che potrebbero causare problemi
          return element.classList?.contains('no-print') || false;
        },
        onclone: (clonedDoc, clonedElement) => {
          console.log("🔄 onclone callback triggered");
          try {
            // Forza il caricamento dei font di sistema
            const style = clonedDoc.createElement('style');
            style.textContent = `
              * {
                font-family: Arial, Helvetica, sans-serif !important;
                box-sizing: border-box !important;
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
              }
            `;
            clonedDoc.head.appendChild(style);

            // Mantieni le immagini ma con fallback sicuro
            const images = clonedDoc.querySelectorAll('img');
            console.log(`🖼️ Found ${images.length} images, processing for CORS safety...`);
            images.forEach((img) => {
              const imgElement = img as HTMLImageElement;
              // Se l'immagine non è caricata o ha problemi CORS, usa placeholder
              if (!imgElement.complete || imgElement.naturalWidth === 0) {
                console.log(`⚠️ Image not loaded, using placeholder: ${imgElement.src}`);
                imgElement.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
              } else {
                console.log(`✅ Image loaded successfully: ${imgElement.src}`);
              }
            });
            
            // Rimuovi tutti i CSS con oklch
            const sheets = Array.from(clonedDoc.styleSheets || []);
            console.log(`📋 Processing ${sheets.length} stylesheets...`);
            
            for (const sheet of sheets) {
              try {
                const rules = sheet.cssRules;
                if (!rules) continue;
                
                for (let i = rules.length - 1; i >= 0; i--) {
                  const rule = rules[i];
                  if (rule.cssText && rule.cssText.includes("oklch(")) {
                    sheet.deleteRule(i);
                    console.log(`🗑️ Removed oklch rule at index ${i}`);
                  }
                }
              } catch (e) {
                console.warn("⚠️ Cannot access stylesheet (CORS):", e);
              }
            }

            // Pulisci stili inline con oklch
            const allElements = clonedDoc.body.querySelectorAll('*');
            let cleanedCount = 0;
            for (const el of Array.from(allElements)) {
              const style = (el as HTMLElement).getAttribute('style');
              if (style && style.includes('oklch(')) {
                (el as HTMLElement).setAttribute(
                  'style',
                  style.replace(/oklch\([^)]*\)/g, '#000000')
                );
                cleanedCount++;
              }
            }
            console.log(`🧹 Cleaned ${cleanedCount} inline oklch styles`);
          } catch (error) {
            console.error("❌ Error in onclone:", error);
          }
        },
      });

      console.timeEnd("html2canvas render");
      console.log("✅ Canvas created:", {
        width: canvas.width,
        height: canvas.height,
      });

      console.log("📄 Step 4: Creating PDF with smart pagination...");
      console.time("PDF generation");

      const pageWidth = 210;  // mm A4
      const pageHeight = 297; // mm A4
      const pdf = new jsPDF("p", "mm", "a4", true);

      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      
      // Calcola dimensioni in px
      const pxPerMm = imgWidthPx / pageWidth;
      const pageHeightPx = pageHeight * pxPerMm;
      
      // Header e footer fissi (in px)
      const headerHeightPx = 480 * (canvas.width / 794); // proporzionale alla scala
      const footerHeightPx = 148 * (canvas.width / 794); // footer + barra
      const contentHeightPx = imgHeightPx - headerHeightPx - footerHeightPx;
      
      // Calcola quante pagine servono per il contenuto
      const contentPerPage = pageHeightPx - headerHeightPx - footerHeightPx;
      const totalPages = Math.max(1, Math.ceil(contentHeightPx / contentPerPage));
      
      console.log("📏 PDF metrics:", {
        pxPerMm,
        pageHeightPx,
        headerHeightPx,
        footerHeightPx,
        contentHeightPx,
        contentPerPage,
        totalPages,
      });

      // Genera pagine
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        console.log(`📃 Processing page ${pageIndex + 1}/${totalPages}...`);
        
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = imgWidthPx;
        sliceCanvas.height = Math.min(pageHeightPx, imgHeightPx);
        
        const ctx = sliceCanvas.getContext('2d');
        if (!ctx) {
          throw new Error("Cannot get 2D context from slice canvas");
        }
        
        // Riempimento bianco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);

        if (pageIndex === 0) {
          // Prima pagina: tutto dall'inizio
          const sliceHeight = Math.min(pageHeightPx, imgHeightPx);
          ctx.drawImage(
            canvas,
            0, 0, imgWidthPx, sliceHeight,
            0, 0, imgWidthPx, sliceHeight
          );
        } else {
          // Pagine successive: header + slice contenuto + footer
          // Header
          ctx.drawImage(
            canvas,
            0, 0, imgWidthPx, headerHeightPx,
            0, 0, imgWidthPx, headerHeightPx
          );
          
          // Contenuto dalla posizione corretta
          const contentOffsetPx = headerHeightPx + (pageIndex * contentPerPage);
          const remainingContent = Math.min(contentPerPage, imgHeightPx - contentOffsetPx - footerHeightPx);
          
          if (remainingContent > 0) {
            ctx.drawImage(
              canvas,
              0, contentOffsetPx, imgWidthPx, remainingContent,
              0, headerHeightPx, imgWidthPx, remainingContent
            );
          }
          
          // Footer
          ctx.drawImage(
            canvas,
            0, imgHeightPx - footerHeightPx, imgWidthPx, footerHeightPx,
            0, pageHeightPx - footerHeightPx, imgWidthPx, footerHeightPx
          );
        }

        const sliceImg = sliceCanvas.toDataURL('image/jpeg', 0.95);
        console.log(`📸 Page ${pageIndex + 1} dataURL length:`, sliceImg.length);
        
        pdf.addImage(sliceImg, 'JPEG', 0, 0, pageWidth, pageHeight);
        console.log(`✅ Page ${pageIndex + 1} added to PDF`);
      }

      console.timeEnd("PDF generation");

      const fileName = `preventivo_${formData.numero || "nuovo"}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log(`💾 Step 5: Saving PDF as "${fileName}"...`);
      
      pdf.save(fileName);
      
      console.log("✅ PDF saved successfully!");
      console.timeEnd("Total Export Time");
      console.groupEnd();
      
    } catch (error: any) {
      console.log("❌ FATAL ERROR during PDF generation:");
      console.log("Error name:", error?.name);
      console.log("Error message:", error?.message);
      console.log("Error stack:", error?.stack);
      console.timeEnd("Total Export Time");
      console.groupEnd();
      
      alert(
        `Si è verificato un errore durante la generazione del PDF.\n\n` +
        `Errore: ${error?.message || 'Unknown error'}\n\n` +
        `Controlla la console per maggiori dettagli.`
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Eye className="h-5 w-5 text-sky-400" />
          Anteprima PDF
        </h2>
        <button
          onClick={esportaPDF}
          disabled={isExporting}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 hover:shadow-sky-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Generazione..." : "Esporta PDF"}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-800/30 p-4 lg:p-6">
        <div className="mx-auto max-w-full overflow-auto">
          <div
            className="mx-auto origin-top scale-[0.45] sm:scale-50 md:scale-[0.6] lg:scale-[0.7] xl:scale-75"
            style={{ width: "794px", minHeight: "1123px" }}
          >
            {/* Container PDF */}
            <div
              ref={preventivoPrintRef}
              style={{
                position: "relative",
                width: "794px", // 210mm in px @ 96dpi
                minHeight: "1123px", // 297mm in px @ 96dpi
                backgroundColor: "#ffffff",
                color: "#0A0A0A",
                fontFamily: "Arial, Helvetica, sans-serif",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* Header fisso */}
              <div style={{ position: "relative", height: "480px", paddingBottom: "40px" }}>
                {/* Logo */}
                <div
                  style={{
                    position: "absolute",
                    left: "57px",
                    top: "57px",
                    height: "68px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    zIndex: 6,
                  }}
                >
                  <img src="/logo.png" alt="AYCL" style={{ height: "40px", width: "auto" }} />
                  <span
                    style={{
                      fontSize: "18pt",
                      fontWeight: "700",
                      color: "#0F2C59",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    AllYouCanLeads
                  </span>
                </div>

                {/* Pannello destro azzurro */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: "358px",
                    height: "396px",
                    backgroundColor: "#5D86FF",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "38px",
                      top: "45px",
                      fontSize: "9pt",
                      lineHeight: "1.4",
                      letterSpacing: "0.3px",
                      textAlign: "right",
                      color: "#ffffff",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    4YOU 4YOUR FUTURE SOCIEDAD LTDA
                    <br />
                    AVENIDA TOUROPERADOR NECKERMANN 3<br />
                    CAMPO INTERNACIONAL, MASPALOMAS, 35100
                    <br />
                    SPAIN
                    <br />
                    CIF B44593010
                  </div>
                </div>

                {/* Banner PREVENTIVO */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "208px",
                    height: "159px",
                    backgroundColor: "#0F2C59",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "57px",
                    overflow: "visible",
                    zIndex: 5,
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "34pt",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      letterSpacing: "1px",
                      lineHeight: "1",
                      whiteSpace: "nowrap",
                    }}
                  >
                    PREVENTIVO
                  </span>
                </div>

                {/* Meta Information */}
                <div
                  style={{
                    position: "absolute",
                    left: "57px",
                    top: "420px",
                    fontSize: "11pt",
                    fontWeight: "700",
                    color: "#0A0A0A",
                    maxWidth: "calc(100% - 114px)",
                    overflow: "hidden",
                    zIndex: 2,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    lineHeight: "1.6",
                    paddingTop: "10px",
                    paddingBottom: "20px",
                  }}
                >
                  <span style={{ color: "#6B7280", letterSpacing: "0.2px" }}>DATA DI EMISSIONE:</span>
                  <span style={{ marginLeft: 6, marginRight: 18 }}>{formatDate(formData.data)}</span>
                  <span style={{ color: "#6B7280", letterSpacing: "0.2px" }}>CLIENTE:</span>
                  <span style={{ marginLeft: 6, marginRight: 18 }}>{formData.cliente.nome || "[Nome Cliente]"}</span>
                </div>
              </div>

              {/* Tabella Articoli */}
              <table
                style={{
                  width: "calc(100% - 114px)",
                  margin: "0 57px 0",
                  marginTop: "30px",
                  fontSize: "11pt",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "8px 10px",
                        color: "#0F2C59",
                        fontSize: "10pt",
                        border: "1px solid #C5CBD3",
                        backgroundColor: "#f0f4f8",
                        textAlign: "left",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      DESCRIZIONE
                    </th>
                    <th
                      style={{
                        padding: "8px 10px",
                        color: "#0F2C59",
                        fontSize: "10pt",
                        border: "1px solid #C5CBD3",
                        backgroundColor: "#f0f4f8",
                        textAlign: "right",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      QUANTITÀ
                    </th>
                    <th
                      style={{
                        padding: "8px 10px",
                        color: "#0F2C59",
                        fontSize: "10pt",
                        border: "1px solid #C5CBD3",
                        backgroundColor: "#f0f4f8",
                        textAlign: "right",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      PREZZO
                    </th>
                    <th
                      style={{
                        padding: "8px 10px",
                        color: "#0F2C59",
                        fontSize: "10pt",
                        border: "1px solid #C5CBD3",
                        backgroundColor: "#f0f4f8",
                        textAlign: "right",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      TOTALE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.articoli.map((articolo, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "1px solid #C5CBD3",
                          textAlign: "left",
                          backgroundColor: "#ffffff",
                          fontSize: "10pt",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        {articolo.descrizione ||
                          "Inserire qui la descrizione dell'articolo o del servizio"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "1px solid #C5CBD3",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          backgroundColor: "#ffffff",
                          fontSize: "10pt",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        {articolo.quantita}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "1px solid #C5CBD3",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          backgroundColor: "#ffffff",
                          fontSize: "10pt",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        {formatCurrency(articolo.prezzo)}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          border: "1px solid #C5CBD3",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          backgroundColor: "#ffffff",
                          fontSize: "10pt",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        {formatCurrency(articolo.quantita * articolo.prezzo)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Sezione inferiore */}
              <div
                style={{
                  display: "flex",
                  gap: "75px",
                  margin: "40px 57px 0",
                  paddingTop: "20px",
                  alignItems: "flex-start",
                }}
              >
                {/* Note */}
                <div
                  style={{
                    flex: "1 1 auto",
                    fontSize: "10pt",
                    lineHeight: "1.4",
                    color: "#404B5A",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  <b
                    style={{
                      color: "#F4A62A",
                      marginBottom: "6px",
                      fontSize: "11pt",
                      display: "block",
                      textTransform: "uppercase",
                      fontWeight: "700",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    NOTE:
                  </b>
                  <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                    {formData.termini || "Nessuna nota inserita"}
                  </div>
                </div>

                {/* Totali */}
                <div
                  style={{
                    width: "283px",
                    fontSize: "11pt",
                    padding: "10px",
                    borderRadius: "3px",
                    backgroundColor: "#f9f9f9",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "12px 0",
                      padding: "8px 0",
                    }}
                  >
                    <b>SUBTOTALE:</b>
                    <span>{formatCurrency(totali.subtotale)}</span>
                  </div>
                  
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "2px solid #0F2C59",
                      paddingTop: "12px",
                      marginTop: "16px",
                      fontSize: "14pt",
                    }}
                  >
                    <b style={{ color: "#0F2C59", fontWeight: "700" }}>TOTALE:</b>
                    <b style={{ color: "#0F2C59", fontWeight: "700" }}>
                      {formatCurrency(totali.totale)}
                    </b>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  position: "absolute",
                  left: "57px",
                  right: "57px",
                  bottom: "95px",
                  fontSize: "11pt",
                  color: "#0A0A0A",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700", marginBottom: "5px" }}>
                    AllYouCanLeads
                  </div>
                  <div style={{ fontSize: "9pt", color: "#6B7280" }}>
                    Grazie per aver scelto i nostri servizi
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "9pt", color: "#6B7280" }}>
                    Per informazioni contattaci
                  </div>
                  <div style={{ fontWeight: "700" }}>
                    info@allyoucanleads.com
                  </div>
                </div>
              </div>

              {/* Barra inferiore */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "53px",
                  backgroundColor: "#0F2C59",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        L'anteprima viene aggiornata in tempo reale. Clicca su "Esporta PDF" per scaricare il
        documento.
      </p>
    </div>
  );
}

