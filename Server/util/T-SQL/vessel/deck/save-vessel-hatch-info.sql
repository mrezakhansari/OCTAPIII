	   EXEC dbo.SP_H_SaveVesselHatchInfo @VoyageId = @voyageId, -- bigint
	       @OperatorId = @operatorId, -- bigint
	       @UserId = NULL, -- bigint
	       @ClerkId = @clerkId, -- bigint
	       @EquipmentId = @equipmentId, -- bigint
	       @HatchNo = @hatchNo, -- nvarchar(15)
	       @IsLoaded = @isLoaded, -- bit
	       @HatchType = @hatchOperationType, -- int
	       @IsDeleted = 0 -- bit
	   