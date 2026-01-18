export interface User {
  id: string;
  username: string;
  name: string;
  role: 'master' | 'manager';
  avatar?: string | null;
}

export interface Partner {
  id: string;
  name: string;
  type: 'imobiliaria' | 'corretor';
  classification: 'ouro' | 'prata' | 'bronze';
  relationship: 'frio' | 'morno' | 'quente' | 'estrategico';
  managerId: string;
  city: string;
  contactName: string;
  status: 'ativo' | 'inativo';
  metrics?: {
    sales: number;
    reservations: number;
    roi: number;
    lastContact: string | null;
  };
}

export interface Interaction {
  id: string;
  partnerId: string;
  clientName?: string;
  managerId: string;
  type: string;
  date: string;
  duration: number;
  quality: number;
  notes?: string | null;
}

export interface Manager {
  id: string;
  name: string;
  role: string;
  avatar?: string | null;
  kpis: {
    effort: number;
    relationship: number;
    roi: number;
    ieg: number;
    sales: number;
    reservations: number;
  };
}

class ApiClient {
  private baseUrl = '/api';

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || 'An error occurred');
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  async login(username: string, password: string): Promise<User> {
    return this.request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async register(data: { username: string; password: string; name: string; role?: 'master' | 'manager'; avatar?: string }): Promise<User> {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/user');
  }

  async getManagers(): Promise<Manager[]> {
    return this.request<Manager[]>('/managers');
  }

  async getPartners(): Promise<Partner[]> {
    return this.request<Partner[]>('/partners');
  }

  async getPartner(id: string): Promise<Partner & { interactions: Interaction[] }> {
    return this.request<Partner & { interactions: Interaction[] }>(`/partners/${id}`);
  }

  async createPartner(data: Omit<Partner, 'id' | 'metrics'>): Promise<Partner> {
    return this.request<Partner>('/partners', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePartner(id: string, data: Partial<Omit<Partner, 'id'>>): Promise<Partner> {
    return this.request<Partner>(`/partners/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deletePartner(id: string): Promise<void> {
    return this.request(`/partners/${id}`, { method: 'DELETE' });
  }

  async getInteractions(): Promise<Interaction[]> {
    return this.request<Interaction[]>('/interactions');
  }

  async createInteraction(data: Omit<Interaction, 'id' | 'clientName'>): Promise<Interaction> {
    return this.request<Interaction>('/interactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePartnerMetrics(partnerId: string, data: { sales: number; reservations: number; roi: number }): Promise<any> {
    return this.request(`/partners/${partnerId}/metrics`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();
