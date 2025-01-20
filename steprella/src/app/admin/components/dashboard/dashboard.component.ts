import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
}

interface RecentActivity {
  id: number;
  action: string;
  user: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats: StatCard[] = [
    { title: 'Toplam Ürün', value: 156, icon: 'fas fa-shoe-prints', color: '#4CAF50' },
    { title: 'Toplam Sipariş', value: 53, icon: 'fas fa-shopping-cart', color: '#2196F3' },
    { title: 'Toplam Müşteri', value: 84, icon: 'fas fa-users', color: '#FF9800' },
    { title: 'Toplam Gelir', value: 25600, icon: 'fas fa-dollar-sign', color: '#9C27B0' }
  ];

  recentActivities: RecentActivity[] = [
    { 
      id: 1, 
      action: 'Yeni sipariş oluşturuldu', 
      user: 'Ahmet Yılmaz', 
      time: '5 dakika önce',
      status: 'success'
    },
    { 
      id: 2, 
      action: 'Stok güncellendi', 
      user: 'Sistem', 
      time: '15 dakika önce',
      status: 'warning'
    },
    { 
      id: 3, 
      action: 'Ödeme başarısız', 
      user: 'Mehmet Demir', 
      time: '1 saat önce',
      status: 'error'
    },
    { 
      id: 4, 
      action: 'Yeni ürün eklendi', 
      user: 'Admin', 
      time: '2 saat önce',
      status: 'success'
    }
  ];

  topProducts = [
    { name: 'Nike Air Max', sales: 28, revenue: 8400 },
    { name: 'Adidas Superstar', sales: 24, revenue: 6000 },
    { name: 'Puma RS-X', sales: 20, revenue: 5000 },
    { name: 'New Balance 574', sales: 18, revenue: 4500 }
  ];
}
