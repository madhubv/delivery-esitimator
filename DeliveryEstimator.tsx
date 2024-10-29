import * as React from 'react';
import { StyleSheet } from "react-nativescript";
import { Product, PincodeInfo, DeliveryEstimate } from '../types';
import { calculateDeliveryDate, getRemainingTimeForCutoff } from '../utils/deliveryUtils';
import { DataService } from '../services/DataService';

interface DeliveryEstimatorProps {
  selectedProduct: Product | null;
}

export function DeliveryEstimator({ selectedProduct }: DeliveryEstimatorProps) {
  const [pincode, setPincode] = React.useState('');
  const [estimate, setEstimate] = React.useState<DeliveryEstimate | null>(null);
  const [countdown, setCountdown] = React.useState('');
  const [dataService, setDataService] = React.useState<DataService | null>(null);

  React.useEffect(() => {
    const initializeService = async () => {
      const service = new DataService();
      await service.initialize();
      setDataService(service);
    };

    initializeService();
  }, []);

  const checkDelivery = React.useCallback(() => {
    if (!selectedProduct || !pincode || pincode.length !== 6 || !dataService) return;

    const pincodeInfo = dataService.getPincodeInfo(pincode);
    if (!pincodeInfo) {
      alert('Invalid pincode');
      return;
    }

    const isAvailable = dataService.isProductAvailableInWarehouse(
      selectedProduct.id,
      pincodeInfo.warehouse_id
    );

    if (!isAvailable) {
      alert('Product not available in the nearest warehouse');
      return;
    }

    const deliveryDate = calculateDeliveryDate(pincodeInfo);
    setEstimate({
      deliveryDate,
      provider: pincodeInfo.provider,
      isSameDayEligible: ['A', 'B'].includes(pincodeInfo.provider),
      cutoffTime: pincodeInfo.provider === 'A' ? '5:00 PM' : pincodeInfo.provider === 'B' ? '9:00 AM' : undefined
    });
  }, [selectedProduct, pincode, dataService]);

  React.useEffect(() => {
    if (estimate?.isSameDayEligible) {
      const timer = setInterval(() => {
        setCountdown(getRemainingTimeForCutoff(estimate.provider));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [estimate]);

  return (
    <stackLayout className="p-4">
      <textField
        className="p-2 border rounded-lg mb-4"
        hint="Enter Pincode"
        keyboardType="number"
        maxLength={6}
        text={pincode}
        onTextChange={(e) => setPincode(e.value)}
      />
      
      <button
        className="bg-blue-500 text-white p-4 rounded-lg"
        isEnabled={!!selectedProduct && pincode.length === 6 && !!dataService}
        onTap={checkDelivery}
      >
        Check Delivery
      </button>

      {estimate && (
        <stackLayout className="mt-4 p-4 bg-gray-100 rounded-lg">
          <label className="font-bold">
            Delivery by {estimate.deliveryDate.toLocaleDateString()}
          </label>
          
          {estimate.isSameDayEligible && (
            <stackLayout>
              <label>Same day delivery cutoff: {estimate.cutoffTime}</label>
              <label className="text-red-500">Time remaining: {countdown}</label>
            </stackLayout>
          )}
          
          <label>Provider: {estimate.provider}</label>
        </stackLayout>
      )}
    </stackLayout>
  );
}