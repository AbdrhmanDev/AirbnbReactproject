import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';


const readableNames = {

  ProfileSection: 'الملف الشخصي',
  EditProfile: 'تعديل الملف',
  hotels: 'الفنادق',
  details: 'تفاصيل الفندق',
  search: 'بحث',
  results: 'نتائج البحث'
};

const SmartBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // لو مفيش حاجة غير / مش هنعرض breadcrumb
  if (pathnames.length === 0) return null;

  return (
    <div className="mt-3">
      <Breadcrumb>
       

        {pathnames.map((name, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;
          const label = readableNames[name] || name;

          return isLast ? (
            <Breadcrumb.Item active key={index}>{label}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index} linkAs={Link} linkProps={{ to: routeTo }}>
              {label}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default SmartBreadcrumb;
