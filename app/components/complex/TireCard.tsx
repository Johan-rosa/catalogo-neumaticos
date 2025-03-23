import Image from "next/image"
import { Maximize2, ExternalLink, Plus, Minus } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

interface Tire {
    brand: string;
    model_id: string;
    model: string;
    url: string;
    type: string;
    size: string;
    img: string;
    price: number;
}

interface TireCardProps {
    brand: string;
    model_id: string;
    model: string;
    url: string;
    type: string;
    size: string;
    img: string;
    price: number;
    tireData: Tire[];
}

export default function TireCard({ brand, model_id, model, url, type, size, img, price, tireData }: TireCardProps) {
    // Find all sizes for this model
    const sizes = tireData.filter((t) => t.model_id === model_id).map((t) => t.size)
    const tires = tireData.filter((t) => t.model_id === model_id)

    return (
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-muted">
          <Image src={img || "/placeholder.svg"} alt={model} fill className="object-contain p-4" />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                aria-label="Ver imagen completa"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] flex items-center justify-center p-0">
              <div className="relative w-full h-full">
                <Image alt="tire photo" src={img} fill className="object-contain p-4" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{model}</h3>
              <div className="mt-1">
                <p className="text-sm text-zinc-500">{brand}</p>
              </div>
            </div>
            <Badge variant="outline">{type}</Badge>
          </div>

          <div className="flex flex-col">
            <span className="font-mediumtext-muted-foreground">{sizes.length} {sizes.length > 1 ? "tamaños disponibles": "tamaño disponible"}</span>
            <div className="mt-2 flex flex-wrap gap-1">
              {sizes.slice(0, 3).map((size, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {size}
                </Badge>
              ))}
              {sizes.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{sizes.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Link href={url} target="_blank" className="text-xs text-primary hover:underline flex items-center">
          Ver detalles <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tamaños y precios</Button>
            </DialogTrigger>
            {dialogContent(img, model, tires, url)}
        </Dialog>
        </CardFooter>
      </Card>
    )
  }

  function formatPrice(price: number): string {
    return `DOP ${price.toLocaleString("en-US", { minimumFractionDigits: 1 })}`;
  }

  const dialogContent = (img: string, model: string, tires: Tire[], url: string) => {
    return (
        <DialogContent className="!max-w-4xl max-h-[90vh] flex flex-col">
            <DialogTitle className="text-xl font-bold">{model}</DialogTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Tire Image */}
                <div className="relative h-[300px] bg-muted rounded-md">
                    <Image src={img || "/placeholder.svg"} alt={model} fill className="object-contain p-4" />
                </div>

                <div>
                    <h4 className="text-sm font-medium mb-2">Tamaños y Precios</h4>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Medida</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Cantidad</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tires.map(tire => (
                                <TableRow key={tire.size}>
                                    <TableCell className="py-1">{tire.size}</TableCell>
                                    <TableCell className="py-1 font-medium text-primary">${formatPrice(tire.price)}</TableCell>
                                    <TableCell className="py-1">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            >
                                            <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center">0</span>
                                            <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            >
                                            <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Order Summary and Add to Order Button */}
                    <div className="mt-6 space-y-4">
                    <Separator />
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-2xl font-bold text-primary">${formatPrice(0)}</p>
                        <p className="text-sm text-muted-foreground">{0} unidades</p>
                        </div>
                        <Button size="lg" disabled={true} >
                        Agregar orden
                        </Button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <Link href={url} target="_blank" className="inline-flex items-center text-primary hover:underline">
                Ver detalles del fabricante <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>

        </DialogContent>
    )
  }