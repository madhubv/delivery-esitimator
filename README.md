# Delivery Estimator App

A React Native application built with NativeScript that helps users estimate delivery dates based on product selection and pincode. The app supports multiple logistics providers and handles different delivery scenarios.

## Features

- Product catalog with 5000+ items
- Pincode-based delivery estimation
- Real-time delivery date calculation
- Same-day delivery countdown timer
- Support for multiple logistics providers:
  - Provider A: Same-day delivery (before 5 PM)
  - Provider B: Same-day delivery (before 9 AM)
  - General Partners: 2-5 days delivery

## Tech Stack

- React Native with NativeScript
- TypeScript
- TailwindCSS for styling
- React Navigation for routing

## Project Structure

```
src/
delivery-estimator/
├── src/
│   ├── components/
│   │   ├── DeliveryEstimator.tsx
│   │   ├── MainStack.tsx
│   │   └── ProductList.tsx
│   ├── screens/
│   │   └── MainScreen.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── deliveryUtils.ts
│   ├── app.css
│   └── app.ts
├── .gitignore
├── nativescript.config.ts
├── package.json
├── project.json
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd delivery-estimator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ns preview
```

## Features in Detail

### Product Selection
- Browse through 5000 products
- Real-time stock availability check
- Product details display

### Pincode Validation
- 6-digit pincode validation
- Automatic logistics provider assignment
- Region-based delivery estimation

### Delivery Estimation
- Same-day delivery eligibility check
- Countdown timer for cutoff times
- Provider-specific delivery calculations
- Region-based delivery windows

### UI/UX Features
- Responsive design
- Real-time updates
- User-friendly navigation
- Clear delivery information display

## Development

### Prerequisites
- Node.js
- NativeScript CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Available Scripts
- `ns preview`: Start development preview
- `ns run android`: Run on Android
- `ns run ios`: Run on iOS

## Performance Optimizations

- Efficient product list rendering
- Optimized delivery calculations
- Minimal re-renders
- Memory-efficient data structures

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
