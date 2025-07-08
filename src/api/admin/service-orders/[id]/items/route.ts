import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { SERVICE_ORDERS_MODULE } from "../../../../../modules/service-orders"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const serviceOrdersService: any = req.scope.resolve(SERVICE_ORDERS_MODULE)
    const { id } = req.params
    
    const items = await serviceOrdersService.listServiceOrderItems({ 
      service_order_id: id 
    })
    
    res.json({ items })
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch service order items",
      details: error instanceof Error ? error.message : "Unknown error"
    })
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const serviceOrdersService: any = req.scope.resolve(SERVICE_ORDERS_MODULE)
    const { id } = req.params
    const { title, quantity_needed, unit_price } = req.body as any
    
    // Validate required fields
    if (!title || !quantity_needed || !unit_price) {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: "Title, quantity_needed, and unit_price are required" 
      })
    }
    
    const item = await serviceOrdersService.addServiceOrderItem(id, req.body as any)
    
    res.status(201).json({ item })
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to add service order item",
      details: error instanceof Error ? error.message : "Unknown error"
    })
  }
} 