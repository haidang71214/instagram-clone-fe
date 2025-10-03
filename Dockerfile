# Dùng node nhẹ
FROM node:20-alpine

WORKDIR /app

# Copy package.json trước
COPY package*.json ./

# Cài dependencies
RUN npm install --legacy-peer-deps

# Copy toàn bộ source
COPY . .

# Expose port React (mặc định react-scripts start = 3000)
EXPOSE 3000

# Chạy react dev server
CMD ["npm", "start"]
