export const formatOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export const formatted = (date: string) => {
  const formateDate = new Date(date);

  return formateDate.toLocaleDateString("en-US", formatOptions);
};

export const toBase64 = (file: File | Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export async function getImageAsBlob(url: string) {
  const response = await fetch(url);
  return await response.blob();
}

export const getParamString = (object: any) => {
  const params = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      //@ts-ignore
      params.append(key, value);
    }
  });

  return params.toString();
};

export function debounce(func: any, delay: number) {
  let timeout: any;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      //@ts-ignore
      func.apply(this, args);
    }, delay);
  };
}

export function formatUserAddress(userData: {
  address?: string;
  state?: string;
  country?: string;
  pincode?: string;
}): string {
  if (!userData) return "";
  return [userData.address, userData.state, userData.country, userData.pincode]
    .filter(Boolean)
    .join(", ");
}

export function calculateAgeDetails(pastDateString: string) {
  const pastDate = new Date(pastDateString);
  const now = new Date();

  let years = now.getFullYear() - pastDate.getFullYear();
  let months = now.getMonth() - pastDate.getMonth();
  let days = now.getDate() - pastDate.getDate();
  let hours = now.getHours() - pastDate.getHours();
  let minutes = now.getMinutes() - pastDate.getMinutes();

  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }

  // Adjust hours
  if (hours < 0) {
    days -= 1;
    hours += 24;
  }

  // Adjust if current month/day is before the past month/day
  if (days < 0) {
    months -= 1;
    // Get number of days in the previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return years
    ? years + " years"
    : months
    ? months + " months"
    : days
    ? days + " days"
    : hours
    ? hours + "hours"
    : minutes + "minutes";
}

export function parseAndExportCSV(rawData: string, filename: string) {
  const lines = rawData
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^[-]+$/.test(line)); // remove empty lines and separator

  if (lines.length < 2) {
    console.warn("Not enough data to parse.");
    return;
  }

  // Step 1: Split header and data
  const headerLine = lines[0];
  const dataLines = lines.slice(1);

  // Step 2: Normalize spacing, split by multiple spaces
  const headers = headerLine.split(/\s{2,}/); // two or more spaces

  const data = dataLines.map((line) => {
    const values = line.split(/\s{2,}/);
    const row: Record<string, string> = {};
    headers.forEach((key, index) => {
      row[key] = values[index] || "";
    });
    return row;
  });

  // Step 3: Export to CSV
  exportToCSV(data, filename);
}

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string
) {
  const headers = Object.keys(data[0]);

  const isValidDate = (value: any): boolean => {
    return typeof value === "string" && !isNaN(Date.parse(value));
  };

  const csvRows = data.map((row) => {
    return headers
      .map((key) => {
        let value = String(row[key]).replace(/"/g, '""'); // Escape quotes
        // 👇 Force Excel to recognize the date as text
        if (isValidDate(value)) {
          value = `="${value}"`;
        } else {
          value = `"${value}"`;
        }

        return value;
      })
      .join(",");
  });

  const csvContent = `${headers.join(",")}\n${csvRows.join("\n")}`;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
