
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatName = (string: string, number: number) => {
  if (string.length > number) {
    return string.substring(0, number).concat('...');
  } else return string;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const formatNumber = (value: number | string) => {
  if (!value) return '';
  const val = Number(value);
  return `${val.toLocaleString('en-US').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const formatAsNgnMoney = (value: number | string) => {
  if (!value) return '';
  const val = Number(value)
  return `${val
    .toLocaleString('en-US')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};


export const isNumber = (value: string | number) => {
  return typeof value === 'number';
};

export const getPageCount = (count: number, limit: number) => {
  const pageCount = Math.ceil(count / limit);
  return pageCount;
};

export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  const pageRange = 2;
  const paginationNumbers = [];

  const showBreakIndicatorStart = currentPage > pageRange + 1;
  const showBreakIndicatorEnd = currentPage < totalPages - pageRange;

  for (let i = 1; i <= Math.min(pageRange, totalPages); i++) {
    paginationNumbers.push(i);
  }
  // Show break indicator if needed before the last two pages
  if (showBreakIndicatorStart && !showBreakIndicatorEnd) {
    paginationNumbers.push('...');
  }
  // Show the pages around the active page
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    if (i > pageRange && i < totalPages - pageRange + 1) {
      paginationNumbers.push(i); // Skip if the page was previously displayed
    }
  }
  // Show break indicator if needed after the first three pages
  if (showBreakIndicatorEnd && !showBreakIndicatorStart) {
    paginationNumbers.push('...');
  }
  // show last two pages
  if (totalPages > 3) {
    for (let i = Math.max(1, totalPages - 1); i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
  }
  return paginationNumbers;
};

export const formatStatus = {
  active: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-green-500"></span>
      <span className="syne fw-600 text-green-500">Active</span>
    </p>
  ),
  confirmed: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-green-500"></span>
      <span className="syne fw-600 text-green-500">Cofirmed</span>
    </p>
  ),
  draft: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-purple-500"></span>
      <span className="syne fw-600 text-purple-500">Undisclosed</span>
    </p>
  ),
  inactive: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-red-500"></span>
      <span className="syne fw-600 text-red-500">Inactive</span>
    </p>
  ),
  pending: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-[#fc819f]"></span>
      <span className="syne fw-600 text-[#fc819f]">Pending</span>
    </p>
  ),
  checkedin: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-purple-600"></span>
      <span className="syne fw-600 text-purple-600">Checked-In</span>
    </p>
  ),
  checkedout: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-blue-600"></span>
      <span className="syne fw-600 text-blue-600">Checked-Out</span>
    </p>
  ),
  cancelled: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-red-500"></span>
      <span className="syne fw-600 text-red-500">Cancelled</span>
    </p>
  ),
};

export const formatStayStatus = {
  pending: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-[#fc819f]"></span>
      <span className="syne fw-600 text-[#fc819f]">Awaiting</span>
    </p>
  ),
  checkedin: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-purple-600"></span>
      <span className="syne fw-600 text-purple-600">Checked-In</span>
    </p>
  ),
  checkedout: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-blue-600"></span>
      <span className="syne fw-600 text-blue-600">Checked-Out</span>
    </p>
  ),
  cancelled: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-red-500"></span>
      <span className="syne fw-600 text-red-500">Cancelled</span>
    </p>
  ),
};

export const formatPhoneNumber = (phoneNumberString:string) => {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '');

  // Extract the first digit (if present) and keep it separate
  let firstDigit = cleaned.length > 0 ? cleaned.charAt(0) : '';
  cleaned = cleaned.substring(1); // Remove the first digit from the cleaned string

  // Format the remaining digits
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '+' + firstDigit + ' (' + match[1] + ') ' + match[2] + '-' + match[3];
  }

  return null;
}