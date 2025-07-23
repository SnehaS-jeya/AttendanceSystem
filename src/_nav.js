import {
  cilSpeedometer,
  cilSchool,
  cilPeople,
  cilUser,
  cilLibrary,
  cilInstitution,
  cilBriefcase,
  cilFactory,
  cilSettings,
  cilUserFollow,
  cilGroup,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavItem, CNavTitle } from "@coreui/react";

export const getNavItems = (access = []) => {
  const nav = [];
  const has = (item) => access.map((x) => x.toLowerCase()).includes(item);
  
  if (has("dashboard")) {
    nav.push({
      component: CNavItem,
      name: "Dashboard",
      to: "/admin-dashboard",
      icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    });
  }

  if (has("schools")) {
    nav.push({
      component: CNavItem,
      name: "Schools",
      to: "/schools",
      icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
    });
  }

  if (has("colleges")) {
    nav.push({
      component: CNavItem,
      name: "Colleges",
      to: "/colleges",
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    });
  }
  
   if (has("clgdashboard")) {
    nav.push({
      component: CNavItem,
      name: "Dashboard",
      to: "/college-dashboard",
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    });
  }

  if (has("offices")) {
    nav.push({
      component: CNavItem,
      name: "Offices",
      to: "/offices",
      icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    });
  }

  if (has("departments")) {
    nav.push({
      component: CNavItem,
      name: "Departments",
      to: "/departments",
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    });
  }

  if (has("students")) {
    nav.push({
      component: CNavItem,
      name: "Students",
      to: "/students",
      icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    });
  }

   if (has("students")) {
    nav.push({
      component: CNavItem,
      name: "College Students",
      to: "/college-students",
      icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    });
  }
  
  if (has("teachers")) {
    nav.push({
      component: CNavItem,
      name: "Teachers",
      to: "/teachers",
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    });
  }
   if (has("classes")) {
    nav.push({
      component: CNavItem,
      name: "Classes",
      to: "/classes",
      icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    });
  }

  if (has("payroll")) {
    nav.push({
      component: CNavItem,
      name: "Payroll",
      to: "/payroll",
      icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    });
  }

  if (has("attendance")) {
    nav.push({
      component: CNavTitle,
      name: "Attendance",
    });
    nav.push({
      component: CNavItem,
      name: "Teachers ",
      to: "/attendance/teachers",
      icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
    });
    
    nav.push({
      component: CNavItem,
      name: "Students",
      to: "/attendance/students",
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    });
  }

  if (has("settings")) {
    nav.push({
      component: CNavItem,
      name: "Settings",
      to: "/settings",
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    });
  }

  return nav;
};



// // src/_nav.js or navBuilder.js
// import { CNavItem } from "@coreui/react";
// import { FaUserGraduate, FaSchool, FaUserTie, FaUserCog } from "react-icons/fa";
// import { AiFillDashboard } from "react-icons/ai";
// import { BiSolidReport } from "react-icons/bi";
// import { MdLogout, MdSettings, MdGroups } from "react-icons/md";
// import { HiBuildingOffice2 } from "react-icons/hi2";

// export const getNavItems = (Access = []) => {
//   const nav = [];
//   const accessList = Access.map((item) => item.toLowerCase());

//   if (accessList.includes("dashboard")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <AiFillDashboard />
//           </span>
//           Dashboard
//         </>
//       ),
//       to: "/dashboard",
//     });
//   }

//   if (accessList.includes("students")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <FaUserGraduate />
//           </span>
//           Students
//         </>
//       ),
//       to: "/students",
//     });
//   }

//   if (accessList.includes("teachers")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <MdGroups />
//           </span>
//           Teachers
//         </>
//       ),
//       to: "/teachers",
//     });
//   }

//   if (accessList.includes("attendance")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <BiSolidReport />
//           </span>
//           Attendance
//         </>
//       ),
//       to: "/attendance",
//     });
//   }

//   if (accessList.includes("schools")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <FaSchool />
//           </span>
//           Schools
//         </>
//       ),
//       to: "/schools",
//     });
//   }

//   if (accessList.includes("colleges")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <FaSchool />
//           </span>
//           Colleges
//         </>
//       ),
//       to: "/colleges",
//     });
//   }

//   if (accessList.includes("departments")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <MdGroups />
//           </span>
//           Departments
//         </>
//       ),
//       to: "/departments",
//     });
//   }

//   if (accessList.includes("offices")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <HiBuildingOffice2 />
//           </span>
//           Offices
//         </>
//       ),
//       to: "/offices",
//     });
//   }

//   if (accessList.includes("employees")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <FaUserTie />
//           </span>
//           Employees
//         </>
//       ),
//       to: "/employees",
//     });
//   }

//   if (accessList.includes("payroll")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <AiFillDollarCircle />
//           </span>
//           Payroll
//         </>
//       ),
//       to: "/payroll",
//     });
//   }

//   if (accessList.includes("settings")) {
//     nav.push({
//       component: CNavItem,
//       name: (
//         <>
//           <span className="nav-icon-spaced">
//             <MdSettings />
//           </span>
//           Settings
//         </>
//       ),
//       to: "/settings",
//     });
//   }

//   // ✅ Logout (always shown)
//   nav.push({
//     component: CNavItem,
//     name: (
//       <>
//         <span className="nav-icon-spaced">
//           <MdLogout />
//         </span>
//         Logout
//       </>
//     ),
//     to: "/logout",
//   });

//   return nav;
// };

// // // src/_nav.js or navBuilder.js
// // import { CNavItem } from "@coreui/react";
// // import { FaUser} from "react-icons/fa";
// // import { AiFillDollarCircle } from "react-icons/ai";
// // import { BiSolidReport } from "react-icons/bi";
// // import { MdLogout } from "react-icons/md";

// // export const getNavItems = (Access = []) => {
// //   const nav = [];

// //   Access = Access.map((item) => item.toLowerCase());


// //   if (Access.includes("dashboard")) {
// //     nav.push({
// //       component: CNavItem,
// //       name: (
// //         <>
// //           <span className="nav-icon-spacedometer">
// //             <FaUser />
// //           </span>
// //           Dashboard
// //         </>
// //       ),
// //       to: "/Usermodule",
// //     });
// //   }

// //   if (Access.includes("schools")) {
// //     nav.push({
// //       component: CNavItem,
// //       name: (
// //         <>
// //           <span className="nav-icon-spaced">
// //             <AiFillDollarCircle />
// //           </span>
// //           Schools
// //         </>
// //       ),
// //       to: "/Itemmodule",
// //     });
// //   }

// //   if (Access.includes("offices")) {
// //     nav.push({
// //       component: CNavItem,
// //       name: (
// //         <>
// //           <span className="nav-icon-spaced">
// //             <BiSolidReport />
// //           </span>
// //           Offices
// //         </>
// //       ),
// //       to: "/report",
// //     });
// //   }

// //   if (Access.includes("colleges")) {
// //     nav.push({
// //       component: CNavItem,
// //       name: (
// //         <>
// //           <span className="nav-icon-spaced">
// //             <BiSolidReport />
// //           </span>
// //           Colleges
// //         </>
// //       ),
// //       to: "/colleges",
// //     });
// //   }

// //   if (Access.includes("settings")) {
// //     nav.push({
// //       component: CNavItem,
// //       name: (
// //         <>
// //           <span className="nav-icon-spaced">
// //             <BiSolidReport />
// //           </span>
// //           Settings
// //         </>
// //       ),
// //       to: "/settings",
// //     });
// //   }

// //   // Logout is always present
// //   nav.push({
// //     component: CNavItem,
// //     name: (
// //       <>
// //         <span className="nav-icon-spaced">
// //           <MdLogout />
// //         </span>
// //         Logout
// //       </>
// //     ),
// //     to: "/logout",
// //   });

// //   return nav;
// // };
