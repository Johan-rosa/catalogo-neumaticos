#' @export
tire_size_category <- tibble(
  size = c(
    # Light Truck Tires (sample)
    "LT215/75R15", "LT235/75R15", "LT245/70R16", "LT265/70R16", 
    "LT285/75R16", "LT245/65R17", "LT265/65R17", "LT285/70R17",
    "LT265/60R18", "LT265/50R20",
    
    # Off-Road/All-Terrain Tires (sample)
    "27×8.50R14LT", "30×9.50R15LT", "31×10.50R15LT", "33×12.50R15LT",
    "35×12.50R18LT", "33×12.50R20LT", "35×12.50R20LT", "37×12.50R17LT",
    "40×13.50R17LT", "38×15.50R20LT",
    
    # Passenger Car Tires (sample)
    "185/60R14", "175/65R14", "195/65R15", "205/65R15", 
    "215/60R15", "205/55R16", "225/55R16", "235/60R16",
    "215/65R17", "225/65R17", "225/55R18", "235/65R18",
    
    # High Performance/UHP Tires (sample)
    "205/40R17", "215/40R17", "245/40R17", "225/45R17", 
    "215/35R18", "245/40R18", "275/30R19", "255/35R19",
    "235/30R20", "275/35R20", "245/30R22", "295/25R22",
    
    # Special Trailer Tires
    "ST175/80R13", "ST205/75R14", "ST215/75R14", "ST205/75R15",
    "ST225/75R15", "ST235/80R16", "ST235/85R16",
    
    # OEM/White Letter Tires (sample)
    "30X9.50R15LT OWL", "265/70R15 OWL", "LT215/75R15 OWL",
    "LT265/70R16 OWL", "35×12.50R17LT OWL", "35×12.50R22LT OWL",
    
    # Heavy Equipment/OTR Tires (sample)
    "18.00-25", "13.00-24", "29.5-29", "17.5R25",
    "26.5R25", "16.00R20", "14.00-25", "18.00R33",
    
    # Agricultural/Farm Tires (sample)
    "7.50-16", "9.00-15", "23.1-26", "16.9-28",
    "11.2-24", "14.9-24", "16.9-34", "12-38"
  ),
  
  category = c(
    # Light Truck Tires
    rep("Light Truck (LT) Tires", 10),
    
    # Off-Road/All-Terrain Tires
    rep("Off-Road/All-Terrain Tires", 10),
    
    # Passenger Car Tires
    rep("Passenger Car Tires", 12),
    
    # High Performance/UHP Tires
    rep("High Performance/UHP Tires", 12),
    
    # Special Trailer Tires
    rep("Special Trailer (ST) Tires", 7),
    
    # OEM/White Letter Tires
    rep("OEM/White Letter Tires (OWL)", 6),
    
    # Heavy Equipment/OTR Tires
    rep("Heavy Equipment/OTR Tires", 8),
    
    # Agricultural/Farm Tires
    rep("Agricultural/Farm Tires", 8)
  )
)
