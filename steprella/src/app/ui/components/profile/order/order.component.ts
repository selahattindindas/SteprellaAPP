import { Component, OnInit } from '@angular/core';
import { OrderFilterComponent } from '../../../pages/profile/order/order-filter/order-filter.component';
import { CommonModule} from '@angular/common';
import { ListOrder } from '../../../../core/models/orders/list-order';
import { OrderHeaderComponent } from "../../../pages/profile/order/order-header/order-header.component";
import { OrderItemComponent } from "../../../pages/profile/order/order-item/order-item.component";
import { OrderFooterComponent } from "../../../pages/profile/order/order-footer/order-footer.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, OrderFilterComponent, OrderHeaderComponent, OrderItemComponent, OrderFooterComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orders: ListOrder[] = [
    {
      id: 1,
      orderNumber: "ORD001",
      totalPrice: "2499.99",
      status: "completed",
      createdDate: "12.01.2025",
      shippingAddress: {
        id: 1,
        title: "Ev",
        description: "Ataşehir, İstanbul",
        cityName: "İstanbul",
        districtName: "Ataşehir",
      },
      items: [
        {
          id: 1,
          orderId: 1,
          productVariantSizeValue: "42",
          quantity: 2,
          unitPrice: 1299.99,
          totalPrice: 2499.99,
          productVariant: {
            ratingCount: 24,
            rating: 4.5,
            description: "Rahat ve şık spor ayakkabı",
            brandName: "Nike",
            shoeModelName: "Air Max",
            materialName: "Tekstil",
            usageAreaName: "Günlük",
            colorName: "Siyah",
            active: true,
            productFiles: [
              {
                id: 1,
                fileName: "nike-airmax-black.jpg",
                path: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/71a804c7-9308-4384-a842-0f764c9eda04/air-max-plus-ayakkab%C4%B1s%C4%B1-tSwXxp.png"
              }
            ]
          }
        }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD002",
      totalPrice: "3299.99",
      createdDate: "12.02.2025",
      status: "pending",
      shippingAddress: {
        id: 2,
        title: "İş",
        description: "Kadıköy, İstanbul",
        cityName: "İstanbul",
        districtName: "Kadıköy",
      },
      items: [
        {
          id: 2,
          orderId: 2,
          productVariantSizeValue: "43",
          quantity: 1,
          unitPrice: 1899.99,
          totalPrice: 1899.99,
          productVariant: {
            ratingCount: 18,
            rating: 4.8,
            description: "Profesyonel koşu ayakkabısı",
            brandName: "Adidas",
            shoeModelName: "Ultraboost",
            materialName: "Tekstil",
            usageAreaName: "Koşu",
            colorName: "Beyaz",
            active: true,
            productFiles: [
              {
                id: 2,
                fileName: "adidas-ultraboost-white.jpg",
                path: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_Light_Ayakkabi_Beyaz_FY2337_01_standard.jpg"
              }
            ]
          }
        },
        {
          id: 3,
          orderId: 2,
          productVariantSizeValue: "41",
          quantity: 1,
          unitPrice: 1400.00,
          totalPrice: 1400.00,
          productVariant: {
            ratingCount: 12,
            rating: 4.3,
            description: "Günlük spor ayakkabı",
            brandName: "Puma",
            shoeModelName: "RS-X",
            materialName: "Sentetik",
            usageAreaName: "Günlük",
            colorName: "Gri",
            active: true,
            productFiles: [
              {
                id: 3,
                fileName: "puma-rsx-grey.jpg",
                path: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/368845/02/sv01/fnd/TUR/fmt/png/RS-X%C2%B3-Puzzle-Ayakkab%C4%B1"
              }
            ]
          }
        }
      ]
    }
  ];

  ngOnInit(): void {
  }


}
