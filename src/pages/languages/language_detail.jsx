// import React, { useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Layout from "../../shared/components/layout";
// import { ArrowLeft, TrendingUp } from "lucide-react";
// import Footer from "../../shared/components/footer";
// import { useDashboardData } from "../../hooks/use_dashboard_data";

// const LanguageDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data, isConnected, lastUpdate } = useDashboardData();

//   useEffect(() => {
//     document.title = `${id.charAt(0).toUpperCase() + id.slice(1)} | Tree'd Admin Panel`;
//   }, [id]);

//   // language metadata
//   const langData = {
//     arabic: { name: "Arabic", color: "#E85D75", flag: "/assets/Flags/arabic7.png", key: "ar" },
//     english: { name: "English", color: "#4A90E2", flag: "/assets/Flags/england.png", key: "en" },
//     french: { name: "French", color: "#BD10E0", flag: "/assets/Flags/french.png", key: "fr" },
//     chinese: { name: "Chinese", color: "#7B68EE", flag: "/assets/Flags/china.png", key: "zh" },
//     dutch: { name: "Dutch", color: "#FF6B9D", flag: "/assets/Flags/netherlands.png", key: "nl" },
//   };

//   const lang = langData[id];
//   if (!lang) return <div style={{ padding: 40 }}>Language not found</div>;

//   // compute artifact totals for this language
//   const artifactsData = useMemo(() => {
//     if (!data?.stored_data?.length) return [];

//     // initialize artifacts
//     const totals = {
//       st15: 0, st16: 0, st17: 0, st18: 0, st19: 0,
//       st21: 0, st22: 0, st23: 0, st24: 0,
//     };

//     // combine across all devices
//     data.stored_data.forEach((device) => {
//       const artifacts = device.artifacts || {};
//       Object.keys(totals).forEach((st) => {
//         totals[st] += artifacts?.[st]?.[lang.key] || 0;
//       });
//     });

//     // artifact info
//     const meta = {
//       st15: { name: "Imhotep", color: "#C17F5D", pic: "/assets/Artifacts/Imhotep.png" },
//       st16: { name: "Osoris", color: "#B8926A", pic: "/assets/Artifacts/Osoris.png" },
//       st17: { name: "Stella of Queen Tetisheri", color: "#9B8B7E", pic: "/assets/Artifacts/Tetisheri.png" },
//       st18: { name: "Ain Ghazal", color: "#8B7355", pic: "/assets/Artifacts/ain_ghazal.png" },
//       st19: { name: "Roman Theatre", color: "#A0826D", pic: "/assets/Artifacts/Roman-Theatre.jpg" },
//       st21: { name: "Statue Of Liberty", color: "#D4A574", pic: "/assets/Artifacts/Statue-Of-Liberty.png" },
//       st22: { name: "Rosetta Stone", color: "#9B8B7E", pic: "/assets/Artifacts/Rosetta-Stone.png" },
//       st23: { name: "Van Gough Self-Portrait", color: "#D4A574", pic: "/assets/Artifacts/Van-Gough.png" },
//       st24: { name: "Mona Lisa", color: "#B8926A", pic: "/assets/Artifacts/Mona-Lisa.png" },
//     };

//     return Object.keys(totals).map((st) => ({
//       name: meta[st].name,
//       pic: meta[st].pic,
//       color: meta[st].color,
//       value: totals[st],
//     })).sort((a, b) => b.value - a.value);
//   }, [data, id]);

//   const totalInteractions = artifactsData.reduce((sum, a) => sum + a.value, 0);
//   const maxValue = Math.max(...artifactsData.map((a) => a.value), 1);

//   const formatNumber = (num) => {
//     if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
//     if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
//     if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
//     return num.toString();
//   };

//   return (
//     <Layout bgColor="#1c2429">
//       <div
//         style={{
//           padding: "40px",
//           backgroundColor: "#F5F7FA",
//           minHeight: "100vh",
//           fontFamily: "'Montserrat', sans-serif",
//         }}
//       >
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/languages")}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             color: "#2D5F7F",
//             marginBottom: "24px",
//             fontSize: "16px",
//           }}
//         >
//           <ArrowLeft size={20} />
//           Back
//         </button>

//         {/* Language Header */}
//         <div
//           style={{
//             backgroundColor: "white",
//             borderRadius: "20px",
//             padding: "32px",
//             boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               marginBottom: "32px",
//               paddingBottom: "24px",
//               borderBottom: "2px solid #E2E8F0",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
//               <img
//                 src={lang.flag}
//                 alt={lang.name}
//                 style={{
//                   width: "80px",
//                   height: "auto",
//                   borderRadius: "12px",
//                   objectFit: "cover",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//                 }}
//               />
//               <div>
//                 <h1
//                   style={{
//                     fontSize: "28px",
//                     fontWeight: "700",
//                     color: "#2D3748",
//                     margin: "0 0 8px 0",
//                   }}
//                 >
//                   {lang.name}
//                 </h1>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                   <TrendingUp size={20} color="#2D3748" />
//                   <span
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "600",
//                       color: "#2D3748",
//                     }}
//                   >
//                     {isConnected
//                       ? `${formatNumber(totalInteractions)} Total Interactions`
//                       : "Connecting..."}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Artifact Breakdown */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//             {artifactsData.map((artifact) => {
//             const percentage = totalInteractions
//               ? ((artifact.value / totalInteractions) * 100).toFixed(1)
//               : 0;
//             return (
//               <div
//                 key={artifact.name}
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "200px 1fr 80px",
//                   alignItems: "center",
//                   gap: "16px",
//                 }}
//               >
//                 {/* Artifact info */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                   }}
//                 >
//                   <img
//                     src={artifact.pic}
//                     alt={artifact.name}
//                     style={{
//                       width: "27px",
//                       height: "27px",
//                       objectFit: "contain",
//                       borderRadius: "4px",
//                     }}
//                   />
//                   <span
//                     style={{
//                       fontSize: "16px",
//                       fontWeight: "600",
//                       color: "#2D3748",
//                     }}
//                   >
//                     {artifact.name}
//                   </span>
//                 </div>

//                 {/* Progress bar */}
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "30px",
//                     backgroundColor: "#E2E8F0",
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                     position: "relative",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: `${(artifact.value / maxValue) * 100}%`,
//                       height: "100%",
//                       backgroundColor: artifact.color,
//                       borderRadius: "8px",
//                       transition: "width 0.5s ease",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "flex-end",
//                       paddingRight: "12px",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: "700",
//                         color: "white",
//                         textShadow: "0 1px 2px rgba(0,0,0,0.2)",
//                       }}
//                     >
//                       {percentage}%
//                     </span>
//                   </div>
//                 </div>

//                 {/* Number */}
//                 <span
//                   style={{
//                     textAlign: "right",
//                     fontSize: "18px",
//                     fontWeight: "700",
//                     color: artifact.color,
//                   }}
//                 >
//                   {formatNumber(artifact.value)}
//                 </span>
//               </div>
//             );
//           })}
//           </div>
//         </div>

//         <Footer lastUpdate={lastUpdate} />
//       </div>
//     </Layout>
//   );
// };

// export default LanguageDetail;
