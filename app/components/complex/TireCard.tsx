import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Maximize2 } from "lucide-react"
import Link from "next/link"

interface Tire {
    brand: string
    model_id: string
    model: string
    url: string
    type: string
    size: string
    img: string
    price: number
}

export default function TireCard(tire: Tire) {
    console.log("Tire img:", tire.img)
    return (
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-muted">
          <Image src={tire.img || "/placeholder.svg"} alt={tire.model} fill className="object-contain p-4" />
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
                <Image alt="tire photo" placeholder="blur" src={tire.img} fill className="object-contain p-4" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{tire.model}</h3>
              <div className="mt-1">
                <p className="text-sm text-zinc-500">{tire.brand}</p>
              </div>
            </div>
            <Badge variant="outline">{tire.type}</Badge>
          </div>

        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link href={tire.url} target="_blank" className="w-full">
            <Button className="w-full">Ver detalles</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }