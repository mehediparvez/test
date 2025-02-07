""" from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Users, AdminProfile, DoctorProfile, PatientProfile

@receiver(post_save, sender=Users)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 'Admin':
            AdminProfile.objects.get_or_create(user=instance)
        elif instance.user_type == 'Doctor':
            DoctorProfile.objects.get_or_create(user=instance)
        elif instance.user_type == 'Patient':
            PatientProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=Users)
def save_user_profile(sender, instance, **kwargs):
    if instance.user_type == 'Admin' and hasattr(instance, 'adminprofile'):
        instance.adminprofile.save()
    elif instance.user_type == 'Doctor' and hasattr(instance, 'doctorprofile'):
        instance.doctorprofile.save()
    elif instance.user_type == 'Patient' and hasattr(instance, 'patientprofile'):
        instance.patientprofile.save() """
